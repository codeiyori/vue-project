<template>
  <v-container class="pa-0 align-center justify-center">
    <v-card-title>
      <span class="text-bold" style="font-size: smaller;">Trading Log</span>
    </v-card-title>
    <v-container style="border: solid 1px #e0e0e0" class="pa-0 mb-3 align-center justify-center">
      <v-table density="compact" fixed-header height="50vh">
        <thead>
          <tr>
            <th class="text-left smaller-font" style="width: 30vw;">
              <span class="text-caption">Title</span>
            </th>
            <th class="text-left">
              <span class="text-caption">Date</span>
            </th>
            <th class="text-left">
              <span class="text-caption">Author</span>
            </th>
            <th class="text-left">
              <span class="text-caption">Likes</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in slicedPosts" :key="index">
            <td class="text-left">
              <span class="text-caption">
                <router-link class="text-caption" :to="{ name: 'PostDetail', params: { id: post.id }}">
                  {{ post.logInfoTitle }}
                </router-link>
              </span>
            </td>
            <td class="text-left">
              <span class="text-caption" style="text-align:left">
                {{ formatDate(post.timestamp) }}
              </span>
            </td>
            <td class="text-left">
              <span class="text-caption">
                {{ post.Username }}
              </span>
            </td>
            <td class="text-left">
              <span class="text-caption">
                {{ post.likes }}    
              </span>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </v-container>
  <v-container class="pa-0">
    <v-row justify="center" no-gutters>
      <v-col cols="4" sm="4">
      </v-col>
      <v-col cols="4" sm="4"  class="d-flex align-center justify-center">
        <v-pagination
          v-model="currentPage"
          :length="Math.ceil(posts.length / itemsPerPage)"
          :total-visible="3"
          color="error"
          density="compact"
          class="my-0"
          @input="updateSlicedPosts"
        ></v-pagination>
      </v-col>
      <v-col cols="4" sm="4" class="d-flex align-center justify-end">  
        <v-btn size="small" @click="$router.push({ name: 'WriteLog' })" class="ml-2">글쓰기</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { db, collection, getDoc, getDocs, doc, query, orderBy } from '../firebase/init.js';

export default {
  name: 'Trading Log',
  data() {
    return {
      posts: [],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  async created() {
    this.posts = await this.getPosts();
  },
  methods: {
    async getPosts() {
      try {
        const postsCollection = collection(db, 'LogBook');
        const q = query(postsCollection, orderBy('timestamp', 'desc'));
        const postsSnapshot = await getDocs(q);
        const posts = [];

        for (const doc of postsSnapshot.docs) {
          const post = doc.data();
          post.id = doc.id;
          posts.push(post);
        }
        return posts;
      } catch (error) {
        console.error('Error getting posts: ', error);
      }
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const today = new Date();
      const optionsDate = { year: "numeric", month: "long", day: "numeric" };
      const optionsTime = { hour: "numeric", minute: "numeric" };
      
      if (date.toDateString() === today.toDateString()) {
        return date.toLocaleTimeString("en-US", optionsTime);
      } else {
        return date.toLocaleDateString("en-US", optionsDate);
      }
    },
    updateSlicedPosts() {
      this.currentPage = parseInt(this.currentPage);
    },
  },
  computed: {
    slicedPosts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.posts.slice(startIndex, endIndex);
    },
  },
};
</script>
