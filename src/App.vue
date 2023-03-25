<template>
  <v-app>
    <Navigation v-if="!navgation" />
    <v-main style="background-color: #f6f6f7;">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>
                   
<script>
// import { doc, orderBy, query, deleteDoc } from 'firebase/firestore'
import SignupForm from './components/SignupForm.vue'
import LoginForm from './components/LoginForm.vue'
import { auth } from './firebase/init.js'
import NavbarTitle from '@/views/site/navtitle.vue'
import SiteMenu from '@/views/site/navmenu.vue'
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: { Footer, Navigation,NavbarTitle, SiteMenu, SignupForm, LoginForm },
  name: 'App',
  props: [],
  data () {
    return {
      navgation: null,
    };
  },
  beforeUpdate() {
    if (auth.currentUser) {
      this.displayName = auth.currentUser.displayName
    }
  },
  created() {
    auth.onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      if (user) {
        this.$store.dispatch("getCurrentUser", user);
      }
    })
    this.checkRoute();
  },
  methods: {
    checkRoute() {
      if (
        this.$route.name === "Login" || 
        this.$route.name === "Register" || 
        this.$route.name === "ForgotPassword"
      ) {
        this.navigation = true;
        return;
      } 
      this.navigation = false;
    }
  },
  watch: {
    $route() {
      this.checkRoute();
    }
  },
}
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.container {
  max-width: 1440px;
  margin: 0 auto;
}
.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}
.link-light {
  color: #fff;
}
</style>
