<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="mx-auto pa-5" max-width="344" width="320" elevation="2">
      <v-card-title class="text-center font-weight-bold">
        User Registration
      </v-card-title>
      <v-card-text class="text-center">
        <p class="login-register">
          Already have an account?
          <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
        </p>
      </v-card-text>
      <v-container class="pt-0 pb-0">
        <v-text-field
          v-model="firstname"
          input-font-size="14"
          color="primary"
          label="First Name"
          hide-details
          placeholder="Enter your first name"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          v-model="lastname"
          color="primary"
          label="Last Name"
          detail="none"
          hide-details
          placeholder="Enter your last name"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          v-model="username"
          color="primary"
          label="Username"
          hide-details
          autocomplete="username"
          placeholder="Enter your username"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          v-model="email"
          color="primary"
          label="Email"
          hide-details
          placeholder="Enter your email address"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          v-model="password"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
        ></v-text-field>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.prevent="register" color="primary">
          Submit
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-text v-if="error" class="text-center pl-2 pr-2 pt-0">
          <span class="text-center">{{ this.errorMsg }}</span>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { db } from '../firebase/init.js'
import { auth } from '../firebase/init.js'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'

export default {
  emits: ['loggedIn'],
  name: "Register",
  data() {
    return {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      error: false,
      errorMsg: ""
    }
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.firstname !== "" &&
        this.lastname !== "" &&
        this.username !== ""
      ) {
        this.error = false;
        try {
          const { user } = await createUserWithEmailAndPassword(auth, this.email, this.password)
          const userRef = doc(collection(db, 'users'), user.uid);
          await setDoc(userRef, {
            firstname: this.firstname,
            lastname: this.lastname,
            username: this.username,
            email: this.email
          })
          this.$emit('loggedIn')
          this.$router.push({ name: "Home" });
        } catch (error) {
          this.error = true;
          this.errorMsg = error.message;
        }
      } else {
        this.error = true;
        this.errorMsg = "Please fill out all the fields!";
      }
    }
  }
}
</script>