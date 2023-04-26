<template>


<v-container class="pt-6 align-center justify-center">
  <p>hi</p>
  <!-- <ExampleNow :title="title"/> -->
  <!-- <ExampleNow/> -->
    <!-- <v-container class="pa-0">
      <blog-post v-if="!user" :post="welcomeScreen" />
      <blog-post v-else="user" :post="GoodByeScreen" />
      <blog-post v-for="(post, index) in sampleBlogPost" :post="post" :key="index" />
    </v-container>
    <v-container class="fill-height pa-0">
      <v-toolbar-title class="align-self-center pa-3">{{ pageTitle }}</v-toolbar-title>
    </v-container>
    <v-container class="d-flex pa-0">
      <v-row no-gutters>
        <v-col v-for="(post, index) in sampleBlogCards.slice(0, 4)" :key="index" cols="12" sm="6" md="4" lg="3">
          <div class="blog-cards pa-2">
            <blog-card :post="post" />
          </div>
        </v-col>
      </v-row>
    </v-container> -->
</v-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/init'
// import ExampleNow from './ExampleNow.vue'
import BlogPost from '../components/BlogPost.vue'
import BlogCard from '../components/BlogCard.vue'
export default {
  name: "Home",
  components: { BlogPost, BlogCard  },
  setup() {
    const user = ref(null)

    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser
      })
    })

    return { user }
  },
  computed: {
  sampleBlogCards() {
    return this.$store.state.sampleBlogCards
  },
  currentUser() {
    return this.$store.state.user
  }
},
  data() {
      return {
          // title: '내 타이틀임',
          welcomeScreen: {
              title: "Welcome!",
              blogPost: "afaoieijfaioejiofaoifjaiofejifoea",
              welcomeScreen: true,
              photo: "coding",
          },
          GoodByeScreen: {
              title: "Goodbye",
              blogPost: "bb",
              welcomeScreen: true,
              photo: "coding",
          },
          sampleBlogPost: [
            {
              title: "this is sampel blogpost title",
              blogHTML: "this is bloghtml",
              blogCoverPhoto: "this is blogCoverPhoto",
            },
            {
              title: "this is sampel blogpost title2",
              blogHTML: "this is bloghtml2",
              blogCoverPhoto: "this is blogCoverPhoto2",
            },
          ],
          pageTitle: 'My Blog'
      }
  },
}
</script>