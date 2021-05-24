<template>
  <v-row>
      <v-col cols="12" md="6" lg="3" v-for="status in statuses" :key="`${status}`">
        <todo-list v-if="statuses.length" :status="status" />
      </v-col>
  </v-row>
</template>

<script>
import TodoCard from '~/components/TodoCard.vue'
import TodoList from '~/components/TodoList.vue'
import { getStatuses } from '~/utils/index'

export default {
  data() {
    return {
      statuses: [],
    }
  },
  components: {
    TodoCard,
    TodoList,
  },
  created() {
    const statuses = getStatuses()
    this.statuses = statuses
  },
}
</script>
