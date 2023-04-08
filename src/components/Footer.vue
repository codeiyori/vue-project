<template>
<v-footer class="bg-black align-center justify-center" >
  <v-row no-gutters>
    <v-col>
      <v-row no-gutters class="d-flex align-center justify-center">
        <v-btn size="small"
        v-for="icon in icons"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="text">
        </v-btn>
      </v-row>
      <v-row no-gutters class="d-flex align-center justify-center">
        <span class="text-caption">{{ new Date().getFullYear() }} — CODEMIB</span>
      </v-row>
    </v-col>
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
  