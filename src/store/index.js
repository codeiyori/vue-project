import { createStore } from 'vuex'
import { auth } from '../firebase/init.js'
import { db } from '../firebase/init.js'
import {  collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'

export default createStore({
  state: {
    sampleBlogCards: [
      { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "May 1, 2021"},
      { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-1", blogDate: "May 2, 2021"},
      { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-1", blogDate: "May 3, 2021"},
      { blogTitle: "Blog Card #4", blogCoverPhoto: "stock-1", blogDate: "May 4, 2021"}
    ],
    blogHTML: "write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    updateUser(state, payload) {
      state.editPost = payload;
    },
    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
    },
    setProfileInfo(state, doc){
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstname;
      state.profileLastName = doc.data().lastname;
      state.profileUsername = doc.data().username;
    },
    setProfileInitials(state) {
      state.profileInitials = 
      (state.profileFirstName || "").match(/(\b\S)?/g).join("") +
      (state.profileLastName || "").match(/(\b\S)?/g).join("");
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    }
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      // const dataBase = await db.collection('users').doc(auth.currentUser.uid); Firebase SDK 8버젼용 or 이전
      const dataBase = await doc(collection(db, 'users'), auth.currentUser.uid);
      // const dbResults = await getDoc(dataBase);
      // commit("setProfileInfo", dbResults);
      // commit("setProfileInitials");
      onSnapshot(dataBase, async (doc) => {
        commit("setProfileInfo", doc);
        commit("setProfileInitials");
        const token = await user.getIdTokenResult();
        const admin = await token.claims.admin;
        commit('setProfileAdmin', admin);
      });
    },
    async updateUserSettings({ commit, state }) {
      const database = collection(db, 'users');
      const userDoc = doc(database, state.profileId);
      await updateDoc(userDoc, {
        firstname: state.profileFirstName,
        lastname: state.profileLastName,
        username: state.profileUsername
      });
      commit("setProfileInitials");
    }
  },
  modules: {
  }
})
