<!-- <template>
      <v-container>
        <v-row>
          <v-col v-for="(item, index) in items" :key="index" cols="12" sm="6" md="4" lg="3">
            <v-card :key="item.uid" class="card" height="400" max-height="400">
              <v-img :src="item.images[0].thumb" height="200px"></v-img>
              <v-card-title>{{ item.title }}</v-card-title>
              <v-card-text class="card-text">{{ item.description }}</v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="showDialog(item)">Details</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="10"
      ></v-pagination>
      <v-dialog v-model="dialogVisible" text-caption max-width="520px">
        <v-card class="text-caption pa-3">
          <v-card-title>{{ selectedItem.title }}</v-card-title>
          <v-card-text>
            <p v-if="selectedItem.age_min && selectedItem.age_max">Age: <span style="color: red">{{ selectedItem.age_min }} - {{ selectedItem.age_max }}</span></p>
            <p v-if="selectedItem.height_min && selectedItem.height_max">Height: <span style="color: red">{{ selectedItem.height_min }}cm - {{ selectedItem.height_max }}cm</span></p>
            <p v-if="selectedItem.sex">Sex: <span style="color: red">{{ selectedItem.sex }}</span></p>
            <p v-if="selectedItem.weight">Weight: <span style="color: red">{{ selectedItem.weight }}</span></p>
            <p v-if="selectedItem.race">Race: <span style="color: red">{{ selectedItem.race }}</span></p>
            <p v-if="selectedItem.hair">Hair: <span style="color: red">{{ selectedItem.hair }}</span></p>
            <p v-if="selectedItem.eyes">Eyes: <span style="color: red">{{ selectedItem.eyes }}</span></p>
            <p v-if="selectedItem.scars_and_marks">Scars & Marks: <span style="color: red">{{ selectedItem.scars_and_marks }}</span></p>
            <p v-if="selectedItem.occupation">Occupation: <span style="color: red">{{ selectedItem.occupation }}</span></p>
            <p v-if="selectedItem.nationality">Nationality: <span style="color: red">{{ selectedItem.nationality }}</span></p>
            <p v-if="selectedItem.dates_of_birth">DOB: <span style="color: red">{{ selectedItem.dates_of_birth }}</span></p>
            <p v-if="selectedItem.place_of_birth">POB: <span style="color: red">{{ selectedItem.place_of_birth }}</span></p>
            <p v-if="selectedItem.age_range">Age Range: <span style="color: red">{{ selectedItem.age_range }}</span></p>
            <p v-if="selectedItem.eye_raw">Eye Raw: <span style="color: red">{{ selectedItem.eye_raw }}</span></p>
            <p v-if="selectedItem.race_raw">Race Raw: <span style="color: red">{{ selectedItem.race_raw }}</span></p>
            <p v-if="selectedItem.complexion">Complexion: <span style="color: red">{{ selectedItem.complexion }}</span></p>
            <p v-if="selectedItem.possible_countries">Possible Countries: <span style="color: red">{{ selectedItem.possible_countries }}</span></p>
            <p v-if="selectedItem.languages">Languages: <span style="color: red">{{ selectedItem.languages }}</span></p>
            <p v-if="selectedItem.suspects">Suspects: <span style="color: red">{{ selectedItem.suspects }}</span></p>
            <p v-if="selectedItem.field_offices">Field Offices: <span style="color: red">{{ selectedItem.field_offices }}</span></p>
            <p v-if="selectedItem.warning_message">Warning Message: <span style="color: red">{{ selectedItem.warning_message }}</span></p>
            <p v-if="selectedItem.dates_of_birth_used">DOB Used: <span style="color: red">{{ selectedItem.dates_of_birth_used }}</span></p>
            <p v-if="selectedItem.modified">Modified: <span style="color: red">{{ selectedItem.modified }}</span></p>
            <p v-if="selectedItem.reward_max">reward_max: <span style="color: red">{{ selectedItem.reward_max }}</span></p>
            <p v-if="selectedItem.reward_min">reward_min: <span style="color: red">{{ selectedItem.reward_min }}</span></p>
            <p v-if="selectedItem.reward_text">reward_text: <span style="color: red">{{ selectedItem.reward_text }}</span></p>
            <p v-if="selectedItem.person_classification">Classification: <span style="color: red">{{ selectedItem.person_classification }}</span></p>
            <p v-if="selectedItem.additional_information">Additional Info: <span style="color: red">{{ selectedItem.additional_information }}</span></p>
            </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="dialogVisible = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </template>
  
  <script>
export default {
  data() {
    return {
      items: [], // 범죄자 정보를 담을 배열
      dialogVisible: false, // 디테일 다이얼로그의 표시 여부
      selectedItem: {}, // 선택된 범죄자 정보를 담을 객체
      currentPage: 1, // 현재 페이지 번호
      totalPages: 49, // 총 페이지 수
    };
  },
  mounted() {
    this.fetchData(); // 페이지 로딩 시 범죄자 정보를 가져옴
  },
  watch: {
    currentPage(newPage) {
      // 현재 페이지 번호를 console.log()로 출력
      this.fetchData(); // 페이지 번호 변경 시 fetchData() 함수 호출
    }
  },
  methods: {
    fetchData() {
      // FBI API에서 범죄자 정보를 가져오는 함수
      fetch(`https://api.fbi.gov/@wanted?pageSize=20&page=${this.currentPage}&sort_on=modified&sort_order=desc`)
        .then(response => response.json())
        .then(data => {
          this.items = data.items;
        })
        .catch(error => console.error(error));
    },
    showDialog(item) {
      // 범죄자 디테일 다이얼로그를 표시하는 함수
      this.selectedItem = item;
      this.dialogVisible = true;
    },
  },
};
</script>
<style scoped>
.card-text {
  max-height: 100px; /* 최대 높이를 150px로 설정 */
  overflow-y: auto; /* 내용이 길어질 경우 스크롤이 생성되도록 설정 */
}
</style> -->