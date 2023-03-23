<template>
    <v-dialog persistent v-model="showUpdateModal" max-width="420" width="300" class="align-center align-self-center">
      <v-card class="pa-1" variant="flat">
        <v-card-title class="text-h6 font-weight-black text-center">
          Update
        </v-card-title>
        <v-divider class="my-1"></v-divider>
        <v-card-text>
          <v-text-field
            v-model="firstName"
            color="error"
            class="my-1"
            hide-details="auto"
            label="First Name"
            placeholder="Enter your first name"
            variant="underlined"
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            color="error"
            class="my-1"
            hide-details="auto"
            label="Last Name"
            placeholder="Enter your last name"
            variant="underlined"
          ></v-text-field>
          <v-text-field
            v-model="username"
            hide-details="auto"
            color="error"
            class="my-1"
            label="Username"
            placeholder="Enter your username"
            variant="underlined"
          ></v-text-field>
          <v-text-field
            v-model="email"
            class="my-1"
            color="error"
            hide-details="auto"
            label="Email"
            disabled
            placeholder="Enter your email address"
            variant="underlined"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn @click="closeModal" color="info" size="small" variant="tonal">
            Cancel
          </v-btn>
          <v-btn @click="updateProfile" variant="tonal" color="error" size="small">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
  </template>
  
  <script>
  import Modal from './Modal.vue'
  import Loading from '../components/Loading.vue'
  export default { 
    name: "UpdateModal",
    components: {
      Modal,
      Loading
    },
    data() {
      return {
        modalMessage: "Changes were saved!",
        showUpdateModal: true,
        modalActive: false,
        loading: false
      }
    },
    methods: {
      updateProfile() {
        this.$store.dispatch("updateUserSettings");
        this.showUpdateModal = false
        this.modalActive = true
      },
      closeModal() {
        this.loading = true;
        this.modalActive = false
        this.loading = false;
        window.location.reload()
      },
    },
    computed: {
      firstName: {
        get() {
          return this.$store.state.profileFirstName;
        },
        set(payload) {
          this.$store.commit("changeFirstName", payload)
        },
      },
      lastName: {
        get() {
          return this.$store.state.profileLastName;
        },
        set(payload) {
          this.$store.commit("changeLastName", payload)
        },
      },
      username: {
        get() {
          return this.$store.state.profileUsername;
        },
        set(payload) {
          this.$store.commit("changeUsername", payload)
        }
      },
      email() {
        return this.$store.state.profileEmail;
      }
    }
  }
  </script>
  