<style>
label.v-label.v-field-label {
  font-size: 12px;
}
</style>
<template>
<v-container class="pa-0 align-center justify-center">
<v-card-title>
    <span class="text-bold" style="font-size: smaller;">Write Log</span>
</v-card-title>
<v-container class="pa-0 mb-3 align-center justify-center">
  <v-row class="align-center">
    <v-col cols="6" md="12" sm="6" class="pr-1">
  <v-text-field
      density="compact"
      style="background:white;"
      variant="outlined" 
      hide-details
      label="Title"
      v-model="title">
  </v-text-field>
  </v-col>
  <v-col cols="6" md="3" sm="6" class="px-1">
  <v-text-field
      class=""
      density="compact"
      style="background:white;"
      variant="outlined" 
      hide-details
      label="Ticker"
      v-model="fields[0].ticker">
  </v-text-field>
  </v-col>
    <v-col cols="6" md="3" sm="6" class="px-1">
    <v-text-field
        class=""
        density="compact"
        style="background:white;"
        variant="outlined" 
        hide-details
        prefix="$"
        label="Enter Price"
        v-model="fields[0].enterPrice"
        @input="calculateTotal(0)">
    </v-text-field>
    </v-col>
    <v-col cols="6" md="3" sm="6" class="px-1">
    <v-text-field
        class=""
        density="compact"
        style="background:white;"
        variant="outlined" 
        hide-details
        prefix="$"
        label="Exit Price"
        v-model="fields[0].exitPrice"
        @input="calculateTotal(0)">
    </v-text-field>
  </v-col>
  <v-col cols="6" md="2" sm="6" class="px-1">
    <v-text-field
        class=""
        density="compact"
        style="background:white;"
        variant="outlined" 
        hide-details
        prefix="$"
        label="Total"
        disabled
        v-model="fields[0].calculateTotal">
    </v-text-field>
  </v-col>
  <v-col cols="6" md="1" sm="6" class="px-1">
    <v-btn hide-details="" @click="addField" class="ma-0">+</v-btn>
  </v-col>
  </v-row>
  <v-row v-for="(field, index) in fields.slice(1)" :key="index" class="d-flex align-center mt-2">
    <v-col cols="12" sm="3" class="">
    <v-text-field
        class=""
        density="compact"
        style="background:white;"
        variant="outlined" 
        hide-details
        label="Ticker"
        v-model="field.ticker">
    </v-text-field>
  </v-col>
  <v-col cols="12" sm="3" class="">
    <v-text-field
        class=""
        density="compact"
        style="background:white;"
        variant="outlined" 
        hide-details
        prefix="$"
        label="Enter Price"
        @input="calculateTotal(index + 1)"
        v-model="field.enterPrice">
    </v-text-field>
  </v-col>
  <v-col cols="12" sm="3" class="">
    <v-text-field
        class=""
        density="compact"
        style="background:white;"
        variant="outlined" 
        hide-details
        prefix="$"
        label="Exit Price"
        @input="calculateTotal(index + 1)"
        v-model="field.exitPrice">
    </v-text-field>
  </v-col>
  <v-col cols="12" sm="3" class="">
    <v-text-field
        class=""
        density="compact"
        prefix="$"
        label="Total"
        style="background:white;"
        variant="outlined"
        disabled 
        hide-details
        v-model="field.calculateTotal">
    </v-text-field>
  </v-col>
    <v-col>
    <v-btn @click="removeField(index + 1)" class="ma-1">-</v-btn>
  </v-col>  
  </v-row>
<v-row class="align-center">
  <v-col cols="12" sm="4" class="pr-1">
    <v-textarea
      label="Today's Market"
      class=""
      auto-grow
      rows="4"
      variant="outlined"
      hide-details
      style="background:white;">
    </v-textarea>
  </v-col>
  <v-col cols="12" sm="4" class="px-1">
    <v-textarea
      label="Win/Lose Factors"
      class=""
      auto-grow
      rows="4"
      variant="outlined"
      hide-details
      style="background:white;">
    </v-textarea>
  </v-col>
  <v-col cols="12" sm="4" class="px-1">
    <v-textarea
      label="Tomorrow's Outlook"
      class=""
      auto-grow
      rows="4"
      variant="outlined"
      hide-details
      style="background:white;">
    </v-textarea>
  </v-col>
</v-row>
</v-container>
<v-container class="pa-0 align-center justify-center">
<v-row>
<v-col cols="12" sm="12" class="mx-3 d-flex justify-end">
    <v-btn @click="saveFields" class="">Save</v-btn>
</v-col>
</v-row>
</v-container>
</v-container>
</template>
  <script>
  import { db, collection, addDoc } from '../firebase/init.js'
  export default {
    name: "WriteLog",
    components: {
    },
    data() {
      return {
        title: "",
        fields: [{ ticker: "", enterPrice: "", exitPrice: "", calculateTotal: "" }]
      };
    },
    computed: {
      logInfocalculateTotal() {
        let total = 0;
        for (let i = 0; i < this.fields.length; i++) {
          if (!isNaN(this.fields[i].calculateTotal)) {
            total += parseFloat(this.fields[i].calculateTotal);
          }
        }
        return total.toFixed(2);
      }
    },
    methods: {
      addField() {
        this.fields.push({ ticker: "", enterPrice: "", exitPrice: "", calculateTotal: "", });
      },
      removeField(index) {
        this.fields.splice(index, 1);
      },
      calculateTotal(index) {
        const enterPrice = isNaN(this.fields[index].enterPrice) ? 0 : parseFloat(this.fields[index].enterPrice);
        const exitPrice = isNaN(this.fields[index].exitPrice) ? 0 : parseFloat(this.fields[index].exitPrice);
        const total = exitPrice - enterPrice;
        this.fields[index].calculateTotal = isNaN(total) ? "" : total.toFixed(2);
      },
      async saveFields(profileId) {
        try {
          const now = new Date(); // 현재 시간을 저장합니다.
          const logInfoTicker = this.fields.map(field => field.ticker);
          const logInfoenterPrice = this.fields.map(field => field.enterPrice);
          const logInfoexitPrice = this.fields.map(field => field.exitPrice);
          const logInfocalculateTotal = this.logInfocalculateTotal;
          const docRef = await addDoc(collection(db, 'LogBook'), 
          { 
            logInfoAll: this.fields,
            logInfoTitle: this.title,
            logInfoTicker,
            logInfoenterPrice,
            logInfoexitPrice,
            logInfocalculateTotal,
            profileId: this.$store.state.profileId,
            Username: this.$store.state.profileUsername,
            timestamp: now.getTime(),
            likes: 0 // 좋아요 수 필드 추가
          });
          // console.log("Document written with ID: ", docRef.id)
        } catch (error) {
          console.error("Error adding document: ", error)
        }
      }
    },
  };
  </script>
  