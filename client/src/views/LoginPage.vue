<template>
  <div class="loginContainer">
    <h1>myWellness</h1>
    <p v-if="loggedInError" class="loginError">
      Unable to login. Please try again
    </p>
    <div class="loginFormInput">
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
    </div>
    <div class="buttonContainer">
      <v-btn
        class="lowerCaseBtn"
        color="primary"
        style="width: 400px"
        @click="logUserIn"
        >Log in</v-btn
      >
    </div>
    <div class="noAccount">
      <p>
        Already have an account?
        <RouterLink to="/sign-up" class="router-link-item">Sign Up</RouterLink>
      </p>
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
import { getUserByUsername } from "@/services/usersService";

const store = useStore();
const router = useRouter();
const username = ref("");
const password = ref("");
const loggedInError = ref(false);

async function logUserIn() {
  try {
    const user = await getUserByUsername(username.value);
    if (user && user.password === password.value) {
      store.dispatch("signIn", user);
      router.push("/");
    } else {
      loggedInError.value = true;
    }
  } catch (error) {
    loggedInError.value = true;
    console.error("Error adding user:", error);
  }
}
</script>
<style scoped>
h1 {
  text-align: center;
}
.loginError {
  text-align: center;
  color: red;
}
.loginContainer {
  border: 1px solid #aeaeae;
  width: 500px;
  margin: 50px auto 50px auto;
  padding: 50px;
  border-radius: 20px;
}
.loginFormInput {
  margin-top: 15px;
}
.buttonContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0 15px 0;
}
.lowerCaseBtn {
  text-transform: capitalize;
}
.noAccount {
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
