<template>
  <div class="editFoodNote">
    <h1>Edit Food Note</h1>
    <v-text-field
      label="Edit your food note"
      variant="outlined"
      class="mb-4"
      v-model="foodNote"
    ></v-text-field>
    <v-btn color="primary" class="capitalizeButton" @click="updateFoodNote">
      Update Note
    </v-btn>
  </div>
</template>

<script setup>
import { VTextField, VBtn } from "vuetify/lib/components/index.mjs";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import { updateFoodNote as updateFoodNoteApi } from "@/services/foodLogsService";

const route = useRoute();
const router = useRouter();
const store = useStore();
const foodNote = ref("");
const username = store.getters.getUser.username || route.query.username;
const date = route.query.date;
const section = route.query.section;
const name = ref();

onMounted(() => {
  if (route.query.foodInfo) {
    const foodInfo = JSON.parse(route.query.foodInfo);
    foodNote.value = foodInfo.notes;
    name.value = foodInfo.name;
  }
});

async function updateFoodNote() {
  await updateFoodNoteApi(username, date, section, name.value, foodNote.value);
  router.back();
}
</script>

<style scoped>
.editFoodNote {
  max-width: 1000px;
  margin: auto;
}
.capitalizeButton {
  text-transform: capitalize;
}
</style>
