<template>
    <v-layout row justify-center>
    ...
        <v-dialog
            v-model="dialog"
            max-width="290">
            <v-card>
                <v-card-title class="headline">test</v-card-title>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false
      }
    },
    methods: {
       showModal() {
       this.dialog = true;
       }
    }
  }
</script>