<template>
  <div class="inputField">
    <p class="infoHeadings">How are you feeling today?</p>
    <p v-show="diaryExists">{{ startDiaryNote }}</p>
    <v-text-field
      v-model="topic"
      label="Topic"
      hide-details
      single-line
    ></v-text-field>
    <v-textarea v-model="note" label="Notes" counter></v-textarea>
    <v-btn
      style="width: 800px"
      class="lowerCaseBtn"
      color="primary"
      @click="insertNotesToDB"
      >submit</v-btn
    >
    <p class="infoHeadings" v-show="diaryExists">Your Diary</p>
    <div
      v-for="(diaryTopic, i) in diaryData.topics"
      :key="i"
      class="diaryCards"
    >
      <v-card variant="elevated">
        <v-card-item>
          <div>
            <h3>{{ diaryTopic }}</h3>
            <div>{{ diaryData.notes[i] }}</div>
            <div class="dateAndTimeOutput">{{ diaryData.dateAndTimes[i] }}</div>
          </div>
        </v-card-item>
      </v-card>
    </div>
  </div>
</template>
<script setup>
import {
  VTextField,
  VTextarea,
  VBtn,
  VCard,
  VCardItem,
} from "vuetify/lib/components/index.mjs";
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { insertToDiary, getDiary } from "@/services/diariesService";
const store = useStore();
const topic = ref("");
const note = ref("");
const user = ref("");
const username = ref("");
const dateAndTime = ref("");
const diaryData = {
  topics: reactive([]),
  notes: reactive([]),
  dateAndTimes: reactive([]),
};
const startDiaryNote = "Enter diary entry to create your diary";
const diaryExists = ref(false);

onMounted(async () => {
  user.value = store.getters.getUser;
  username.value = user.value.username;

  try {
    await getUserDiary(username.value);
    diaryExists.value = true;
  } catch {
    diaryExists.value = false;
  }
});

function generateDateAndTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const strTime = `${hours}:${minutes}${ampm}`;
  const currentdateAndTime = `${year}-${month}-${day} ${strTime}`;
  dateAndTime.value = currentdateAndTime;
}

async function insertNotesToDB() {
  try {
    generateDateAndTime();
    await insertToDiary(
      username.value,
      topic.value,
      note.value,
      dateAndTime.value
    );
    topic.value = "";
    note.value = "";
    await getUserDiary(username.value);
    diaryExists.value = true;
  } catch (err) {
    console.err("Failed to add to db", err);
  }
}

async function getUserDiary() {
  try {
    const result = await getDiary(username.value);
    diaryData.topics.splice(0, diaryData.topics.length, ...result.topics);
    diaryData.notes.splice(0, diaryData.notes.length, ...result.notes);
    diaryData.dateAndTimes.splice(
      0,
      diaryData.dateAndTimes,
      ...result.dateAndTimes
    );
  } catch (err) {
    console.err(err);
  }
}
</script>
<style scoped>
h3 {
  margin-top: 5px;
  margin-bottom: 5px;
}
.dateAndTimeOutput {
  color: #8f8f8f;
}
.infoHeadings {
  font-size: 20px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 20px;
}
.lowerCaseBtn {
  text-transform: capitalize;
}
.inputField {
  width: 800px;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}
.diaryCards {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
