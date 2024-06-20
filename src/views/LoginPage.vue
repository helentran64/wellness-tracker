<template>
  <div class="loginContainer">
    <h1>myWellness</h1>
    <div class="loginFormInput">
      <v-text-field
        label="Username"
        variant="outlined"
        type="text"
      ></v-text-field>
      <v-text-field
        label="Password"
        variant="outlined"
        type="password"
      ></v-text-field>
    </div>
    <div class="buttonContainer">
      <v-btn class="lowerCaseBtn" color="primary" style="width: 400px"
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
</script>
<style scoped>
h1 {
  text-align: center;
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
