<!-- <template>
  <div class="loading">
    <v-progress-circular
      indeterminate
      color="primary"
      size="50"
      class="d-flex align-center justify-center"
    ></v-progress-circular>
  </div>
</template> -->
<template>
  <div class="text-center">
    <v-overlay
      :model-value="overlay"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
  export default {
    name: "Loading",
    data: () => ({
      overlay: false,
    }),

    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
  }
</script>