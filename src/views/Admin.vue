<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="mx-auto pa-5" max-width="344" width="320" elevation="2">
      <v-card-title class="text-center font-weight-bold">
        Administration
      </v-card-title>
      <v-card-text class="text-center">
        <p class="login-register">
          Adding admin role
        </p>
      </v-card-text>
      <v-container class="pt-0 pb-0">
        <v-text-field
          v-model="adminEmail"
          color="primary"
          autocomplete="email"
          label="Email"
          hide-details
          placeholder="Enter user email to make them an admin"
          variant="underlined"
        ></v-text-field>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.prevent="addAdmin" color="primary">
          Submit
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-text v-if="functionMsg" class="text-center pl-2 pr-2 pt-0">
          <span class="text-center">{{ functionMsg }}</span>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { getFunctions, httpsCallable } from "firebase/functions";
import { ref } from "vue";

const functions = getFunctions();

export default {
  name: "Admin",
  setup() {
    const adminEmail = ref("");
    const functionMsg = ref(null);
    const addAdminFunction = httpsCallable(functions, "addAdminRole"); // move this line outside of the try block

    const addAdmin = async () => {
      try {
        const result = await addAdminFunction({ email: adminEmail.value });
        console.log(result.data);
        functionMsg.value = `Success! ${adminEmail.value} has been made an admin!!`; // set success message with email
        adminEmail.value = ""; // reset the input field
      } catch (err) {
        console.log(err.message);
        functionMsg.value = `Failed to add admin for ${adminEmail.value}: ${err.message}`; // set error message with email
        adminEmail.value = ""; // reset the input field
      }
    };
    return { adminEmail, functionMsg, addAdmin };
  },
};
</script>