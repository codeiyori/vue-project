<template>
    <v-card class="mx-auto" max-width="600" >
        <v-container v-show="editPost" class="pa-0">
                <v-btn class="ma-2" size="x-small" color="orange-light" icon="mdi-playlist-edit"></v-btn>
                <v-btn class="ma-2" size="x-small" color="orange-light" icon="mdi-trash-can-outline"></v-btn>
        </v-container>
      <v-img src="src/assets/blogPhotos/beautiful-stories.jpg" height="200px" cover >
      </v-img>
      <v-card-title><h2>{{ post.blogTitle }}</h2>
      </v-card-title>
      <v-card-subtitle><h5>{{ post.blogDate }}</h5>
      </v-card-subtitle>
      <v-card-actions>
        <v-btn color="orange-lighten-2" variant="text" >
          Explore
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show">
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </template>
  
  <script>
  export default {
    name: "blogCard",
    props: ["post"],
    data() {
      return {
        show: false
      }
    },
    computed: {
        editPost() {
            return this.$store.state.editPost
        }
    }
  }
  </script>
  
  <style>
  </style>
  