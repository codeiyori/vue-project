<template>
  <v-app>
    <Navigation v-if="!navgation" />
    <v-main style="background-color: #f6f6f7;">
      <router-view />
    </v-main>
    <Footer :footer="footer"></Footer>
  </v-app>
</template>
                   
<script>
import SignupForm from './components/SignupForm.vue'
import LoginForm from './components/LoginForm.vue'
import { auth } from './firebase/init.js'
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: { Footer, Navigation, SignupForm, LoginForm, Footer },
  name: 'App',
  props: [],
  data () {
    return {
      navgation: null,
      footer: ' - CODEMIB',
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: #000;
}
.link-light {
  color: #fff;
}
</style>
