<template>
  <v-app>
    <!-- <v-navigation-drawer :elevation="2"
      app
      v-model="drawer"
      >
      <v-list-item>
        <v-list-item-title class="title">
          Application
        </v-list-item-title>
        <v-list-item-subtitle>
          subtext
        </v-list-item-subtitle>
      </v-list-item>
    </v-navigation-drawer> -->
    <v-navigation-drawer :elevation="6"
        v-model="drawer"
        temporary
      >
        <v-list-item
          prepend-avatar="https://avatars.githubusercontent.com/u/126932805?s=400&u=cc2f1b04a4183054030b56d733dbccddbf444f86&v=4"
          title="IU"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    <v-app-bar
      color="black"
      app
      dark
    >
      <v-app-bar-nav-icon/>
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

export default {
  components: { NavbarTitle, SiteFooter },
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
