<!-- <template>
  <div>
    <h1>Log Book</h1>
    <ul>
      <li v-for="(book, index) in logBooks" :key="index">
        <div>Document ID: {{ book.id }}</div>
        <div v-for="(info, i) in book.data.logInfo" :key="i">
          <div>Calculate Total: {{ info.calculateTotal }}</div>
          <div>Enter Price: {{ info.enterPrice }}</div>
          <div>Exit Price: {{ info.exitPrice }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { db, collection, getDocs } from '../firebase/init.js'

export default {
  name: 'LogBook',
  data() {
    return {
      logBooks: []
    }
  },
  methods: {
    async getLogBooks() {
      const querySnapshot = await getDocs(collection(db, 'Log Book'))
      this.logBooks = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data()
        }
      })
    }
  },
  created() {
    this.getLogBooks()
  }
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <h1>Log Book</h1>
        <v-card v-for="(book, index) in logBooks" :key="index" class="mb-5">
          <router-link :to="'/logbookdetail/' + book.id">
            <v-card-title>
              <h3>Document ID: {{ book.id }}</h3>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6" sm="4">Calculate Total:</v-col>
                <v-col cols="6" sm="8">{{ book.data.calculateTotal }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="4">Enter Price:</v-col>
                <v-col cols="6" sm="8">{{ book.data.enterPrice }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="4">Exit Price:</v-col>
                <v-col cols="6" sm="8">{{ book.data.exitPrice }}</v-col>
              </v-row>
            </v-card-text>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { db, collection, addDoc } from '@/firebase/init'

export default {
  name: 'LogBook',
  data() {
    return {
      calculateTotal: '',
      enterPrice: '',
      exitPrice: ''
    }
  },
  methods: {
    async addLogBook() {
      const logInfo = [
        {
          calculateTotal: this.calculateTotal,
          enterPrice: this.enterPrice,
          exitPrice: this.exitPrice
        }
      ]
      await addDoc(collection(db, 'Log Book'), { logInfo })
      this.$router.push('/logbook')
    }
  }
}
</script> -->
