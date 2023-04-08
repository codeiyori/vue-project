<template>
  <div>
    <h2>Create New Post</h2>
    <v-form>
      <v-text-field label="Blog Title" v-model="blogTitle">
      </v-text-field>
      <vue-editor 
        :editorOptions="editorSettings"
        v-model="blogHTML"
        @change="onFileInputChange" 
        class="mt-4">
      </vue-editor>
      <v-btn color="primary" @click="uploadBlog" class="mt-4">Post</v-btn>
      <v-alert v-if="error" type="error" class="mt-4">{{ errorMsg }}</v-alert>
    </v-form>
  </div>
</template>
  <script>
  import { VueEditor } from "vue3-editor";
  import { collection, doc, setDoc } from "firebase/firestore"; 
  import { db, ref, uploadBytes, getDownloadURL, storage } from '../firebase/init.js'

  export default {
    components: {
      VueEditor,
    },
    data() {
      return {
        error: false,
        errorMsg: "",
        selectedFiles: [],
        editorSettings: {
        },
      };
    },
    methods: {
      onFileInputChange(e) {
        console.log('File is uploaded successfully');
        this.selectedFiles = Array.from(e.target.files);
      },
      async uploadBlog() {
        try {
          if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
            const timestamp = Date.now();
            const dataBase = collection(db, 'blogPosts');
            const imageUrls = [];

            for (let i = 0; i < this.selectedFiles.length; i++) {
              const file = this.selectedFiles[i];
              const fileName = file.name;
              const storageRef = ref(storage, fileName);
              const snapshot = await uploadBytes(storageRef, file);
              const imageUrl = await getDownloadURL(snapshot.ref);
              imageUrls.push(imageUrl);
            }

            await setDoc(doc(dataBase), {
              blogTitle: this.blogTitle,
              blogHTML: this.blogHTML,
              profileId: this.profileId,
              date: timestamp,
              imageUrls: imageUrls,
            });  

            this.$router.push({ name: "Home" });
          } else {
            this.error = true;
            this.errorMsg = "Please ensure Blog Title & Blog Post has been filled!";
            setTimeout(() => {
              this.error = false;
            }, 5000);
          }
        } catch (error) {
          console.log(error);
          this.error = true;
          this.errorMsg = "Something went wrong. Please try again later!";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      },
      browseFiles() {
        this.$refs.fileInput.click();
      },
    },
    computed: {
      profileId() {
        return this.$store.state.profileId;
      },
      blogTitle: {
        get() {
          return this.$store.state.blogTitle;
        },
        set(payload) {
          this.$store.commit("updateBlogTitle", payload);
        },
      },
      blogHTML: {
        get() {
          return this.$store.state.blogHTML;
        },
        set(payload) {
          this.$store.commit("newBlogPost", payload);
        },
      },
    },
  };
  </script>
  
  
  
  

