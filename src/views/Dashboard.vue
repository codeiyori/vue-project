<template>
  <v-container style="border: solid 1px #e0e0e0" class="mt-4 pa-0 align-center justify-center">
    <v-table density="compact" fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left smaller-font">
            <span class="text-caption">Name</span>
          </th>
          <th class="text-left">
            <span class="text-caption">Username</span>
          </th>
          <th class="text-left">
            <span class="text-caption">Email</span>
          </th>
          <th class="text-left">
            <span class="text-caption">Status</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in $store.state.users" :key="index">
          <td class="text-caption">{{ user.firstname }} {{ user.lastname }}</td>
          <td class="text-caption">{{ user.username }}</td>
          <td class="text-caption">{{ user.email }}</td>
          <td class="text-caption">{{ user.status }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
<script>
import { db, auth } from '../firebase/init.js'
import { collection, getDocs } from '@/firebase/init'

export default {
  name: "Dashboard",
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);

      let users = [];

      for (const doc of querySnapshot.docs) {
        const user = doc.data();
        users.push(user);
      }
      this.$store.commit("setUsers", users);
    },
  },
}
</script>
