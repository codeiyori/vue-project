<template>
    <div>
      <h1>Create Post</h1>
      <form @submit.prevent="submitPost">
        <div>
          <label for="post-title">Title:</label>
          <input id="post-title" type="text" v-model="postTitle" required>
        </div>
        <div>
          <label for="post-content">Content:</label>
          <VueEditor v-model="postContent"></VueEditor>
        </div>
        <button type="submit">Submit Post</button>
      </form>
    </div>
  </template>

<script>
import { VueEditor } from 'vue3-editor'

export default {
  name: "CreatePost",
  components: {
    VueEditor,
  },
  data() {
    return {
      postTitle: "",
      postContent: "",
    };
  },
  methods: {
    submitPost() {
      // Submit post data to backend API
      console.log("Title: ", this.postTitle);
      console.log("Content: ", this.postContent);
    },
  },
};
</script>




<!-- <template>
    <div class="create-post">
        <v-container class="{invisible: !error}">
            <p>Error: {{ this.errorMsg }}</p>
        </v-container>
        <input type="text" v-model="blogTitle" />
        <div class="upload-file">
            <label for ="blog-photo">upload photo</label>
            <input type="file" ref="blogPhoto" id="blog-photo" accept=".png, .jpg, .jpeg" />
            <button class="preview" :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURl}">preview</button>
            <span>file chosen: {{  this.$store.state.blogPhotoName }}</span>
        </div>
        <div class="editor">
            <vue-editor :editorOption="editorSettings" v-model="blogHTML" useCustomImageHandler />
        </div>
        <div class="blog-action">
            <button>publish blog</button>
            <router-link class="router-button" to="#">post preview</router-link>
        </div>
    </div>
</template>

<script>
import Quill from 'quill'
import ImageResize from 'quill-image-resize-module';

Quill.register('modules/imageResize', ImageResize);

export default {
    name: 'CreatePost',
    data() {
        return {
            error: null,
            errorMsg: null,
            editorSettings: {
                modules: {
                    imageResize: {

                    },
                }
            }
        }
    }
}
</script> -->
