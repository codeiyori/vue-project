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
import NavbarTitle from '@/views/site/navtitle.vue'
import SiteFooter from '@/views/site/footer.vue'
import SiteMenu from '@/views/site/navmenu.vue'

export default {
  components: { NavbarTitle, SiteFooter, SiteMenu },
  name: 'App',
  props: ['footer', 'title'],
  data () {
    return {
      drawer: false
    }
  }
  // data: () => ({
  //   //
  // })
}
</script>
