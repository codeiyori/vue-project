<template>
  <v-container class="admin" fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2>Administration</h2>
        <v-card class="admin-info" elevation="2">
          <h2>Add Admin</h2>
          <v-form>
            <v-text-field
              label="Enter user email to make them an admin"
              v-model="adminEmail"
            ></v-text-field>
            <v-btn @click="addAdmin" color="primary">Submit</v-btn>
          </v-form>
          <span v-if="functionMsg">{{ this.functionMsg }}</span>
        </v-card>
      </v-col>
    </v-row>
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

    const addAdmin = async () => {
      try {
        const addAdminFunction = httpsCallable(functions, "addAdminRole");
        const result = await addAdminFunction({ email: adminEmail.value });
        console.log(result.data);
        adminEmail.value = "";
        functionMsg.value = `Success! ${adminEmail.value} has been made an admin!!`; // set success message with email
      } catch (err) {
        console.log(err.message);
        // functionMsg.value = `Failed to add admin for ${adminEmail.value}: ${error.message}`; // set error message with email
      }
    };

    return { adminEmail, functionMsg, addAdmin };
  },
  methods: {
    // you can remove this method as it is no longer needed
  },
};
</script>
