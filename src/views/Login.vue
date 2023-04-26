<template>
 <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="mx-auto pa-5" max-width="" width="" elevation="2">
      <v-card-title class="text-center font-weight-bold">
        User Sign-In
      </v-card-title>
      <v-card-text class="text-center">
        <p class="login-register">
          Don't have an account?
          <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
        </p>
      </v-card-text>
      <v-container class="pt-0 pb-0">
      <v-text-field
        v-model="email"
        color="primary"
        label="Email"
        autocomplete="email"
        hide-details
        placeholder="Enter your email address"
        variant="underlined"
      ></v-text-field>
      <v-text-field
        v-model="password"
        color="primary"
        label="Password"
        autocomplete="on"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>
      </v-container>
      <v-container class="flex items-center justify-between">
        <v-row align="center">
          <v-col style="text-align: left;">
            <v-checkbox class="vcheckremember text-sm" 
            hide-details v-model="rememberMe"
            label="Remember me"></v-checkbox>
          </v-col>
          <v-col style="text-align: end;">
              <router-link class="router-link text-caption" :to="{ name: 'ForgotPassword' }">Forgot your password?</router-link>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.prevent="signIn" color="primary">
          Sign In
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-actions>
         <v-btn @click.prevent="signInWithGoogle" color="error">
             구글로 로그인
             <v-icon icon="mdi-google" end></v-icon>
           </v-btn>
      </v-card-actions>
      <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
      <Loading v-if="loading" />
    </v-card>
</v-container>
</template>

<script>
import { auth } from '../firebase/init.js'
import Modal from '../components/Modal.vue'
import Loading from '../components/Loading.vue'
// import { mapActions } from 'vuex'; 맵액션을 사용하면 코드가 많을때 가독성이 좋아짐
import { signInWithEmailAndPassword,} from 'firebase/auth'

export default {
  name: "Login",
  data() {
    return {
      rememberMe: false,
      email: "",
      password: "",
      modalActive: false,
      loading: false,
      modalMessage: ""
    }
  },
  components: {
    Loading,
    Modal,
  },
  // methods: {
  //   ...mapActions(['signInWithGoogle'])
  // }, 맵액션을 사용하면 코드가 많을때 가독성이 좋아짐
  methods: {
    signIn() {
      this.loading = true;
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          this.loading = false
          // this.$router.push({ name: 'Home' }) 이미 라우터에서 onAuthStateChanged로 설정함
        })
        .catch((err) => {
          this.modalMessage = err.message
          this.modalActive = true
        })
    },
    closeModal() {
      this.loading = false
      this.modalActive = false
      this.email = ""
      this.password = ""
    },
    async signInWithGoogle() {
        await this.$store.dispatch('signInWithGoogle');
        this.$emit('loggedIn')
        // this.$router.push({ name: 'Home' }) 이미 라우터에서 onAuthStateChanged로 설정함
    }
  },
}
</script>
<style scoped="scoped">
/* label에 대한 스타일을 작성 */
.v-label {
  font-size: 10px; /* 원하는 글자 크기로 변경 */
}
</style>