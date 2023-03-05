<template>
  <v-list-item link :to="{ name: 'home' }">
    <v-list-item-title class="title font-weight-bold">
      {{ title }}
    </v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  name: 'ListItemTitle',
  data () {
    return {
      title: 'CODEMIB'
    }
  }
}
</script>
