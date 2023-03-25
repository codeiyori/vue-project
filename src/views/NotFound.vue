<template>
    <v-container>
      <v-row class="mt-12">
        <v-col cols="12" class="text-center">
          <h1 class="display-1">404</h1>
          <h2 class="display-4">Page Not Found</h2>
          <v-divider class="pa-4 border-opacity-0"></v-divider>
            <v-btn :to="{name: 'Home'}" variant="tonal" color="error">Go to Home</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
<script>
export default {
  name: "NotFound",
}
</script>  