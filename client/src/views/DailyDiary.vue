<template>
  <div class="inputField">
    <p class="infoHeadings">How are you feeling today?</p>
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
  </div>
</template>
<script setup>
import { VTextField, VTextarea, VBtn } from "vuetify/lib/components/index.mjs";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { insertToDiary } from "@/services/diariesService";
const store = useStore();
const topic = ref("");
const note = ref("");
const user = ref("");
const username = ref("");
const dateAndTime = ref("");

onMounted(() => {
  user.value = store.getters.getUser;
  username.value = user.value.username;
  generateDateAndTime();
});

function generateDateAndTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(now.getDate()).padStart(2, "0");
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const strTime = `${hours}:${minutes}${ampm}`;

  const currentdateAndTime = `${year}-${month}-${day} ${strTime}`;
  dateAndTime.value = currentdateAndTime;
}

async function insertNotesToDB() {
  try {
    await insertToDiary(username.value, topic, note, dateAndTime.value);
    console.log("Added to db");
  } catch (err) {
    console.err("Failed to add to db", err);
  }
}
</script>
<style scoped>
.infoHeadings {
  font-size: 20px;
  font-weight: 500;
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
</style>
