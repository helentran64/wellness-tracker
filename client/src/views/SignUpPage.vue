<template>
  <div class="signupContainer">
    <h1>myWellness</h1>

    <div class="signupFormInput">
      <v-text-field
        label="First Name"
        variant="outlined"
        type="text"
      ></v-text-field>
      <v-text-field
        label="Last Name"
        variant="outlined"
        type="text"
      ></v-text-field>
      <v-text-field
        label="Email"
        variant="outlined"
        type="email"
      ></v-text-field>
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
      <div class="buttonContainer">
        <v-btn class="lowerCaseBtn" color="primary" style="width: 400px;">Sign Up</v-btn>
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
