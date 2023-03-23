<template>
<v-footer fluid class="d-flex flex-column pr-0 pl-0 pt-0 pb-0">
    <v-row class="bg-black w-100 align-center justify-center" no-gutters>
    <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="text"
    ></v-btn>
    </v-row>
    <v-container class="d-flex flex-column">
    <v-row class="pt-3 pb-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec dolor vitae velit facilisis ultrices. Nulla quis ipsum vel eros volutpat semper quis non mauris
    </v-row>
    </v-container>
    <v-row class="px-4 py-2 bg-black text-center w-100" no-gutters>
    <v-col>{{ new Date().getFullYear() }} — <strong>CODEMIB</strong></v-col>
    </v-row>
</v-footer>
</template>
  
  <script>
  export default {
    data: () => ({
      icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
    }),
  }
  </script>
  