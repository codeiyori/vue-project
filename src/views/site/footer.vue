<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-footer app color="black" dark absolute="">
      <v-col class="text-center mt-4" cols="12">
        &copy; {{ new Date().getFullYear() }} — <strong>{{ footer }}</strong>
      </v-col>
    </v-footer>
</template>

<script>
export default {
  data () {
    return {
      footer: 'CODEMIB'
    }
  }
}
</script>
