<template>
  <v-dialog v-model="modalActive" persistent width="auto">
    <v-card>
      <v-card-text>
        <p>{{ modalMessage }}</p>
      </v-card-text>
      <v-card-actions class="pa-4 d-flex justify-end">
        <v-btn color="error" size="small" variant="outlined" @click="closeModal">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Modal",
  props: {
    modalMessage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      modalActive: true,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

