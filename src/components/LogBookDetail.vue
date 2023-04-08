<!-- <template>
    <v-container>
      <v-row>
        <v-col cols="12" md="8" offset-md="2">
          <h1>Log Book Detail</h1>
          <v-card>
            <v-card-title>
              <h3>Document ID: {{ LogBookDetail.id }}</h3>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6" sm="4">Calculate Total:</v-col>
                <v-col cols="6" sm="8">{{ LogBookDetail.data.calculateTotal }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="4">Enter Price:</v-col>
                <v-col cols="6" sm="8">{{ LogBookDetail.data.enterPrice }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="4">Exit Price:</v-col>
                <v-col cols="6" sm="8">{{ LogBookDetail.data.exitPrice }}</v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { db, doc, getDocs } from '@/firebase/init'
  
  export default {
    name: 'LogBookDetail',
    data() {
      return {
        LogBookDetail: {}
      }
    },
    methods: {
      async getLogBookDetail() {
        const docRef = doc(db, 'Log Book', this.$route.params.id)
        const docSnap = await getDocs(docRef)
        if (docSnap.exists()) {
          this.LogBookDetail = {
            id: docSnap.id,
            data: docSnap.data().logInfo[0] // 첫 번째 로그 정보만 표시
          }
        } else {
          console.log('No such document!')
        }
      }
    },
    created() {
      this.getLogBookDetail()
    }
  }
  </script>
   -->