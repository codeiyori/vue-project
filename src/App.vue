<template>
  <v-app>
    <v-navigation-drawer :elevation="6" v-model="drawer" temporary>
      <v-list-item>
        <site-menu></site-menu>
      </v-list-item>
    </v-navigation-drawer>
    <v-app-bar color="black" app dark>
      <!-- <v-app-bar-nav-icon/> -->
      <navbar-title :title="title"/>
      <v-spacer/>
      <v-btn icon to ="/about">
        <v-btn icon="mdi-heart"></v-btn>
      </v-btn>
      <v-btn icon="mdi-magnify"></v-btn>
      <v-btn icon="mdi-dots-vertical" @click.stop="drawer = !drawer"></v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
    <site-footer :footer="footer"></site-footer>
    </v-app>
</template>
<script>
// import the firestore instance and relevant methods

import db from './firebase/init.js'
import { collection, addDoc } from 'firebase/firestore'

import NavbarTitle from '@/views/site/navtitle.vue'
import SiteFooter from '@/views/site/footer.vue'
import SiteMenu from '@/views/site/navmenu.vue'

export default {
  methods: {
    async createUser() {
      // 'users' collection reference
      const colRef = collection (db, 'users')
      // data to send
      const dataObj = {
        firstName: 'John',
        lastName: 'Doe',
        dob: '1990'
      }

      // create document and return reference to it
      const docRef = await addDoc(colRef, dataObj)

      // access auto-generated ID with '.id'
      console.log('Document was created with ID:', docRef.id)
    }
  },
  created() {
    this.createUser()

  },
  components: { NavbarTitle, SiteFooter, SiteMenu },
  name: 'App',
  props: ['footer', 'title'],
  data () {
    return {
      drawer: false
    }
  },
  mounted () {
  }
}
</script>
