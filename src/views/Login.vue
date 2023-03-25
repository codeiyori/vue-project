<template>
 <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="mx-auto pa-5" max-width="344" width="320" elevation="2">
      <v-card-title class="text-center font-weight-bold">
        User Sign-In
      </v-card-title>
      <v-card-text class="text-center">
        <p class="login-register">
          Don't have an account?
          <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
        </p>
      </v-card-text>
      <v-container class="pt-0 pb-0">
      <v-text-field
        v-model="email"
        color="primary"
        label="Email"
        autocomplete="email"
        hide-details
        placeholder="Enter your email address"
        variant="underlined"
      ></v-text-field>
      <v-text-field
        v-model="password"
        color="primary"
        label="Password"
        autocomplete="on"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>
      <p class="Forgot-password">
        <router-link class="router-link" :to="{ name: 'ForgotPassword' }">Forgot your password?</router-link>
      </p>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.prevent="signIn" color="primary">
          Sign In
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
      <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
      <Loading v-if="loading" />
    </v-card>
</v-container>
</template>

<script>
import { auth } from '../firebase/init.js'
import Modal from '../components/Modal.vue'
import Loading from '../components/Loading.vue'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      modalActive: false,
      loading: false,
      modalMessage: ""
    }
  },
  components: {
    Loading,
    Modal,
  },
  methods: {
    signIn() {
      this.loading = true;
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          this.loading = false
          this.$router.push({ name: 'Home' })
        })
        .catch((err) => {
          this.modalMessage = err.message
          this.modalActive = true
        })
    },
    closeModal() {
      this.loading = false
      this.modalActive = false
      this.email = ""
      this.password = ""
    },
  }
}
</script>
