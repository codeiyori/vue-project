<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{name: 'Home'}">CODEMIB</router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{name: 'Home'}">Home</router-link>
          <router-link class="link" to="#">Blogs</router-link>
          <router-link v-if ="admin" class="link" :to="{name: 'CreatePost'}">Create Post</router-link>
          <router-link v-if ="user" class="link" :to="{name: 'TradingLog'}">거래일지</router-link>
          <router-link v-if ="user" class="link" :to="{name: 'InvoiceForm'}">인보이스</router-link>
          <router-link v-if ="!user" class="link" :to="{name: 'Login'}">Login/Register</router-link> 
          <template v-if="user">
             <ProfileModal />
          </template>
          <template v-else>
          </template>
        </ul>
      </div>
    </nav>
    <v-icon @click="toggleMobileNav" class="menu-icon" v-show="mobile" size="large" color="black-darken-2" icon="mdi-menu"></v-icon>
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <h2 class="v-card-title-text text-center pb-4">CODEMIB</h2>
        <v-divider :thickness="2" class="border-opacity-50" color="white">
        </v-divider>
        <v-divider :thickness="0" class="py-2"></v-divider>
        <router-link class="link pt-2 pb-2" :to="{name: 'Home'}">Home</router-link>
        <router-link class="link pt-2 pb-2" to="#">Blogs</router-link>
        <router-link class="link pt-2 pb-2" to="#">Create Post</router-link>
      </ul>
    </transition>
  </header>
</template>


<script>
import { ref } from 'vue'
import { auth } from '@/firebase/init'
import { defineComponent } from 'vue'
import LoginMsg from './LoginForm.vue'
import SignUp from '../views/Register.vue'
import ProfileModal from './ProfileModal.vue'

export default defineComponent({
  components: { LoginMsg, SignUp, ProfileModal },
  name: 'Navigation',
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windownWidth: null,
    };
  },
  setup() {
    const user = ref(null)
    // Check if a user is already logged in on component mount
    auth.onAuthStateChanged((currentUser) => {
      user.value = currentUser
    })
    return {
      user,
    }
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windownWidth = window.innerWidth
      if (this.windownWidth <= 768) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav
    },
  },
  computed: {
    admin() {
      return this.$store.state.profileAdmin;
    }
  },
});
</script>
  
<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 20px;
  z-index: 99;
  border-bottom: solid 1px #e0e0e0;

  .link {
    font-family: "quicksand", sans-serif;
    font-size: 14px;
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #5a5ccc;
    }
  }

  nav {
    display: flex;
    padding: 20px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }
    .nav-links {
        position: relative;
        display: flex;
        flex:1;
        align-items: center;
        justify-content: flex-end;

        ul {
            margin-right: 32px;

            .link {
                margin-right: 32px;
            }

            .link:last-child {
                margin-right: 0;
            }
        }
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 30px;
    right: 20px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    left: 0px;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #000;
    top: 0;
  }
  .v-card-title-text {
      color: #fff;
  }
  .mobile-nav a {
    color: #fff; 
  }
  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 0.6s ease;
  }

  .mobile-nav-enter {
    transform: translateX(-250px);
  }
  .mobile-nav-enter-to {
    transform: translateX(0px);
  }
  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>