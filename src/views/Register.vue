<template>
    <v-card
      class="mx-auto"
      max-width="344"
      title="User Registration"
      variant="flat"
    >
      <v-container>
        <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
        </p> 
        <v-text-field
          v-model="firstname"
          color="primary"
          label="First Name"
          placeholder="Enter your first name"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          v-model="lastname"
          color="primary"
          label="Last Name"
          placeholder="Enter your last name"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          v-model="username"
          color="primary"
          label="Username"
          placeholder="Enter your username"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          v-model="email"
          color="primary"
          label="Email"
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
        <v-divider></v-divider>
        <v-card-actions>
        <v-spacer></v-spacer>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
        <v-btn @click.prevent="register">
          Sign In
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
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