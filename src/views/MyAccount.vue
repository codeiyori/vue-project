<template>
  <h2>Welcome {{ displayName }}</h2>
  <v-btn @click.prevent="logOut">Log Out</v-btn>
</template>

<script>
import { defineComponent } from 'vue'
import { signOut } from '@firebase/auth'
import { auth } from '../firebase/init.js'

export default defineComponent({
  data() {
    return {
      displayName: ''
    };
  },
  beforeMount() {
      if (auth.currentUser) {
      this.displayName = auth.currentUser.displayName
      }
  },
  methods: {
      logOut() {
          signOut(auth)
              .then(() => {
              this.$emit('loggedOut')
              this.$router.push({ name: 'Home' })    
              })
              .catch((error) => {
              console.error(error)
              })
      }
}
})
</script>