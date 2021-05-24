<template>
  <v-card class="w-100 my-2">
    <nuxt-link class="text-decoration-none" :to="`todos/${todo.id}`">
    <v-row class="px-3 py-3" no-gutters>
      <v-col class="" style="color:black;"> {{todo.title}}</v-col>
    </v-row>
    </nuxt-link>
  </v-card>
</template>

<script lang="ts">

import Vue, { PropOptions } from 'vue'
export default Vue.extend({
  name: 'TodoCard',
  props: {
    todo: {
      type: Object,
      // required: true,
    },
  },
})
</script>

<style>
.w-100{
  width: 100%;
}
</style>