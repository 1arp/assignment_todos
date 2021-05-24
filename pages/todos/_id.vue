<template>
  <div class="">
    <v-container v-if="todo">
      <v-card class="pa-8">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="todo.title"
            label="Title"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="12">
          <v-text-field
            v-model="todo.description"
            label="Description"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="todo.status"
            :items="statuses"
            :item-text="(status) => status.name"
            :item-value="(status) => status"
            label="Status"
            required
          ></v-select>
        </v-col>
      </v-row>
      </v-card>
      <div class="" v-if="todo.status">
      <v-btn large @click="save" class="ma-2 float-right" :color="todo.status.color"  dark>
        Save
        <v-icon dark right large> mdi-checkbox-marked-circle </v-icon>
      </v-btn>
      <v-btn large @click="deleteNode" class="ma-2 float-right" :color="todo.status.color"  dark>
        
        Delete
        <v-icon dark right large> mdi-delete </v-icon>
      </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { deleteTodo, editTodo, getStatuses, getTodo } from '~/utils'
export default {
  name: 'hello',
  data() {
    return {
      todo: {},
      statuses: [],
    }
  },
  beforeMount() {
    const todo = getTodo(this.$route.params.id)
    console.log(todo)
    this.todo = todo
    console.log(this.todo.status.color)
    this.statuses = getStatuses()
  },
  computed:{
    colorNew(){
      // return this.todo.status.color
    }
  },
  methods: {
    save() {
      editTodo({ ...this.todo })
      this.$router.push('/')
    },
    deleteNode(){
      deleteTodo(this.todo.id)
      this.$router.push('/')
    }
  },
}
</script>
