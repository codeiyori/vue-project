<template>
    <v-container class="fill-height d-flex align-center justify-center">
      <v-card class="mx-auto pa-5" max-width="344" width="320" elevation="2">
        <v-card-title class="text-center font-weight-bold">
          Administration
        </v-card-title>
        <v-card-text class="text-center">
          <p class="login-register">
            Removing admin role
          </p>
        </v-card-text>
        <v-container class="pt-0 pb-0">
          <v-text-field
            v-model="adminEmail"
            color="primary"
            autocomplete="email"
            label="Email"
            hide-details
            placeholder="Enter user email to remove their admin role"
            variant="underlined"
          ></v-text-field>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.prevent="removeAdmin" color="error">
            Submit
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text v-if="functionMsg" class="text-center pl-2 pr-2 pt-0">
          <span class="text-center">{{ functionMsg }}</span>
        </v-card-text>
        <v-card-text v-if="errorMsg" class="text-center pl-2 pr-2 pt-0">
          <span class="text-center error">{{ errorMsg }}</span>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { getFunctions, httpsCallable } from "firebase/functions";
  import { ref } from "vue";
  
  const functions = getFunctions();
  
  export default {
    name: "RemoveAdmin",
    setup() {
      const adminEmail = ref("");
      const functionMsg = ref(null);
      const errorMsg = ref(null);
      const removeAdminFunction = httpsCallable(functions, "removeAdminRole");
  
      const removeAdmin = async () => {
        try {
          const result = await removeAdminFunction({ email: adminEmail.value });
          if (result.data.message) {
            functionMsg.value = `Success! ${adminEmail.value} no longer has admin privileges.`;
            adminEmail.value = "";
          } else {
            throw new Error("Error: Admin role not found for the user");
          }
        } catch (err) {
          console.log(err.message);
          errorMsg.value = `Failed to remove admin role for ${adminEmail.value}: ${err.message}`;
          adminEmail.value = "";
        }
      };
      return { adminEmail, functionMsg, errorMsg, removeAdmin };
    },
  };
  </script>
  