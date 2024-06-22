<template>
  <div class="signupContainer">
    <h1>myWellness</h1>

    <div class="signupFormInput">
      <v-text-field
        v-model="firstName"
        label="First Name"
        variant="outlined"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        label="Last Name"
        variant="outlined"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="Email"
        variant="outlined"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="username"
        label="Username"
        variant="outlined"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        variant="outlined"
        type="password"
      ></v-text-field>
      <div class="buttonContainer">
        <v-btn
          class="lowerCaseBtn"
          color="primary"
          style="width: 400px"
          @click="addUser"
          >Sign Up</v-btn
        >
      </div>
      <div class="hasAccount">
        <p>
          Already have an account?
          <RouterLink to="/login" class="router-link-item">Log In</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { VBtn } from "vuetify/components";
import { VTextField } from "vuetify/lib/components/index.mjs";
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getUserByUsername, insertUser } from "@/services/usersService";

const store = useStore();
const router = useRouter();
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const username = ref("");
const password = ref("");

async function addUser() {
  try {
    await insertUser({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      username: username.value,
      password: password.value,
    });
    const user = await getUserByUsername(username.value);
    if (user) {
      const userId = user._id;
      console.log(userId);
      store.dispatch("signIn", user);
      firstName.value = "";
      lastName.value = "";
      email.value = "";
      username.value = "";
      password.value = "";

      router.push("/");
    }
  } catch (error) {
    console.error("Error adding user:", error);
  }
}
</script>
<style scoped>
h1 {
  text-align: center;
}
.signupContainer {
  border: 1px solid #aeaeae;
  width: 500px;
  margin: 50px auto 50px auto;
  padding: 50px;
  border-radius: 20px;
}
.signupFormInput {
  margin-top: 15px;
}
.lowerCaseBtn {
  text-transform: capitalize;
}
.buttonContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0 15px 0;
}
.hasAccount {
  display: flex;
  justify-content: center;
  align-items: center;
}
.router-link-item {
  text-decoration: none;
  color: blue;
  border-radius: 4px;
}
</style>
