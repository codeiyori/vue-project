<template>
<div class="blog-wrapper">
    <div class="blog-content">
        <div>
            <h2 v-if="post.welcomeScreen"> {{ post.title }}</h2>
            <h2 v-else>{{ post.title }}</h2>
            <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>
            <p class="content-preview" v-else>{{ post.blogHTML }}</p>
            <router-link class="link link-dark" v-if="post.welcomeScreen" to="/">
                Login/Register<v-icon size="large" color="green-darken-2" icon="mdi-arrow-right-bold"></v-icon>
            </router-link>
            <router-link v-if="user" class="link link-dark" :to="{name: 'Home'}">
                view The post<v-icon size="large" color="green-darken-2" icon="mdi-arrow-right-bold"></v-icon>
            </router-link>
        </div>
    </div>
    <div class="blog-photo">
        <img v-if="post.welcomeScreen" :src="bs1" alt="" />
        <img v-else :src="dfe1" alt="" />
    </div>
</div>
</template>
<script>
import bs from '../assets/blogPhotos/beautiful-stories.jpg'
import dfe from '../assets/blogPhotos/designed-for-everyone.jpg'

export default {
    computed: {
    bs1() {
      return bs
    },
    dfe1() {
      return dfe
    }
  },
    name: "blogPost",
    props: ["post"],
    }
</script>