<template>
  <v-container class="pa-0 align-center justify-center" v-if="post">
    <v-card-title>
      <span class="text-bold" style="font-size: smaller;">{{ post.logInfoTitle }}</span>
    </v-card-title>
    <v-container style="border: solid 1px #e0e0e0" class="pa-0 mb-3 align-center justify-center">
      <v-table density="compact" fixed-header height="50vh">
        <thead>
          <tr>
            <th class="text-left smaller-font">
              <span class="text-caption">No.</span>
            </th>
            <th class="text-left smaller-font">
              <span class="text-caption">Ticker</span>
            </th>
            <th class="text-left smaller-font">
              <span class="text-caption">Enter Price</span>
            </th>
            <th class="text-left smaller-font">
              <span class="text-caption">Exit Price</span>
            </th>
            <th class="text-left smaller-font">
              <span class="text-caption">Total</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(field, index) in post.logInfoAll" :key="index">
            <td class="text-left smaller-font">
              <span class="text-caption">{{ index + 1}}.&nbsp;</span>
            </td>
            <td class="text-left smaller-font">
              <span class="text-caption">{{ field.ticker }}&nbsp;</span>
            </td>
            <td class="text-left smaller-font">
              <span class="text-caption">${{ field.enterPrice }}&nbsp;</span>
            </td>
            <td class="text-left smaller-font">
              <span class="text-caption">${{ field.exitPrice }}&nbsp;</span>
            </td>
            <td class="text-left smaller-font">
              <span class="text-caption">${{ field.calculateTotal }}</span>
            </td>
          </tr>
          <tr>
            <td colspan="4"></td>
            <td class="text-left smaller-font">
              <span class="text-caption">${{ post.logInfocalculateTotal }}</span>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </v-container>
  <v-container v-else>
    <p>Loading post...</p>
  </v-container>
  <v-container class="pa-0">
    <v-row justify="center" no-gutters>
      <v-col cols="4" sm="4">
      </v-col>
      <v-col cols="4" sm="4"  class="d-flex align-center justify-center">
          <v-badge :content="post.likes" color="error">
          <v-btn :ripple="false" size="small" @click.async="likePost(post)" icon>
            <v-icon icon="mdi-heart" color="error"></v-icon>
          </v-btn>
        </v-badge>
      </v-col>
      <v-col cols="4" sm="4" class="d-flex align-center justify-end">  
        <v-btn elevation="1" class="mx-1" size="small" @click="$router.push({ name: 'TradingLog' })">List</v-btn>
        <v-btn elevation="1" size="small">Update</v-btn>
      </v-col>
    </v-row>
  </v-container>

</template>
  <script>
  import { db, collection, updateDoc, getDoc, doc } from '../firebase/init.js';
  
  export default {
    name: 'PostDetail',
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        post: {},
      };
    },
    async created() {
      this.post = await this.getPost(this.id);
    },
    methods: {
      async getPost(id) {
        try {
          const docRef = doc(collection(db, 'LogBook'), id);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            return docSnap.data();
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error getting document: ', error);
        }
      },
      async likePost(post) {
        try {
          const docRef = doc(collection(db, 'LogBook'), this.id);
          await updateDoc(docRef, {
            likes: post.likes + 1,
          });
          this.post.likes++;
        } catch (error) {
          console.error('Error updating document: ', error);
        }
      },
    },
  };
  </script>
  