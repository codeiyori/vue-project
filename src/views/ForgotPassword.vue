<template>
  <v-container>
    <v-card class="mx-auto" max-width="344" variant="outlined">
      <v-card-title class="text-center font-weight-bold">
        Reset Password
      </v-card-title>
      <v-card-text class="text-center pa-0">
        <p class="reset-password">
          Back to
          <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
        </p>
      </v-card-text>
        <v-container>
          <v-card-text class="text-center pa-0">
          <p class="reset-password font-weight-medium">
            Forgot your password?<br>
            Enter your email to reset it
          </p>
          </v-card-text>
          <v-text-field 
            v-model="email" 
            color="primary" 
            label="Email" 
            placeholder="Enter your email address" 
            variant="underlined"
            ></v-text-field>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.prevent="resetPassword" :disabled="!email">Reset</v-btn>
        </v-card-actions>
        <Loading v-if="loading" />
        <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    </v-card>
  </v-container>
</template>

<script>
import Modal from '../components/Modal.vue'
import { auth } from '../firebase/init.js'
import Loading from '../components/Loading.vue'
import { sendPasswordResetEmail } from 'firebase/auth'

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      modalActive: false,
      modalMessage: '',
      loading: null,
    }
  },
  components: {
    Modal,
    Loading,
  },
  methods: {
    resetPassword() {
      this.loading = true
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          this.loading = false
          this.modalActive = true
          this.modalMessage = 'If your account exists, you will receive an email'
        })
        .catch((err) => {
          this.modalActive = true
          this.modalMessage = err.message
        })
    },
    closeModal() {
      this.loading = false
      this.modalActive = !this.modalActive
      this.email = ""
    },
  },
}
</script>
