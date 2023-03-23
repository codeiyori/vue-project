<template>
    <v-menu transition="slide-y-transition" max-width="180" width="220" rounded>
    <template v-slot:activator="{ props }">
    <v-btn v-bind="props" color="brown" size="small" icon="mdi-account-circle" >
        <span class="text-h7">{{ this.$store.state.profileInitials }}</span>
    </v-btn>
    </template>
    <v-card>
        <v-card-text>
        <div class="mx-auto text-center">
            <v-avatar color="brown" size="small">
            <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
            <h3 class="text-caption mt-1">{{ this.$store.state.profileUsername }}</h3>
            <v-divider class="my-1"></v-divider>
            <v-btn size="small" variant="plain" :to="{ name: 'Profile' }">Profile</v-btn>
            <v-divider class="my-1"></v-divider>
            <v-btn size="small" variant="plain" :to="{ name: 'Admin' }">Admin</v-btn>
            <v-divider class="my-1"></v-divider>
            <v-btn size="small" @click="signOut" color="error" variant="plain">Sign Out</v-btn>
        </div>
        </v-card-text>
    </v-card>
    </v-menu>
</template>
<script>
import { auth } from '../firebase/init'
import Loading from '../components/Loading.vue'

export default {
    name: 'ProfileModal',
    components: {
    Loading,
  },
    methods: {
      signOut() {
        this.loading = true;
        auth.signOut()
        this.loading = false;
        this.$router.push({ name: "Home" });
      }
    }
  }
</script>