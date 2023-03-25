<template>
    <v-container>
        <div class="text-h6 mb-2 font-weight-black text-center">
            Create Post
        </div>
        <v-form validate-on="submit" @submit.prevent="submit">
        <v-text-field
            v-model="postTitle"
            color="error"
            required
            label="Title"
            class="my-text-field"
            density="compact"
            variant="outlined"
            hide-details
            placeholder="Enter your title"
            style="background-color: white;"
        ></v-text-field>
        <v-divider color="transparent" class="my-2"></v-divider>
        <div>
          <VueEditor v-model="postContent" ></VueEditor>
          
        </div>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="" color="error" size="small" variant="outlined">
            Submit
        </v-btn>
        </v-card-actions>
        </v-form>
    </v-container>
</template>
<style>
.ql-container {
    background: white;
    
}
.v-text-field--outlined {
  border-color: rgba(192, 0, 250, 0.986);
}
</style>

<script>
import { QuillResize } from 'quill-image-resize-module'
import { VueEditor, Quill } from 'vue3-editor'

Quill.register('modules/imageResize', QuillResize);

export default {
  name: "CreatePost",
  components: {
    VueEditor, QuillResize
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
