<template>
  <div :class="`w-100 ${status.color} lighten-5 pa-4`" style="position:relative;">
    <div class="">
    <div :class="`d-flex justify-space-between flex-nowrap ${status.color} lighten-5`">
      <div class="">
        <v-chip :class="`${status.color} lighten-3`" label>{{status.name}}</v-chip>
        <span class="grey--text text--darken-3 mx-2">{{this.todoCount}}</span>
      </div>
      <div class="">
        <v-icon class="grey--text">mdi-dots-horizontal</v-icon>
        <label :for="`new${status.id}`"><v-icon class="grey--text">mdi-plus</v-icon></label>
      </div>
    </div>
    <draggable group="tasks" :list="todos" @change="saveAll($event,todos)">
      <todo-card v-for="(todo) in todos" :key="todo.id" :todo="todo"></todo-card>
    </draggable >
    <v-card class="w-100 my-2">
    <slot/>
    <v-row class="px-3 py-3" no-gutters>
      <v-col cols="10">
          <v-text-field
            label="Title"
            :id="`new${status.id}` " v-model="newTodo.title"
            required
          ></v-text-field>
        </v-col>
      <!-- <v-col><input class="inputAdd " :id="`new${status.id}` " v-model="newTodo.title" placeholder="+"></v-col> -->
      <v-col cols="2">
        <v-btn fab @click="addTodo" class="ma-2 float-right" :color="`${status.color} lighten-1`" dark>
        <v-icon dark> mdi-checkbox-marked-circle </v-icon>
      </v-btn>
      </v-col>
    </v-row>
    </v-card>
    </div>
  </div>
</template>

<script >
import Vue from 'vue'
import TodoCard from './TodoCard.vue'
import draggable from 'vuedraggable'
import { editTodo, getTodos, pushTodo } from '~/utils'
export default Vue.extend({
  components: { TodoCard, draggable },

  name: 'TodoList',
  data(){
    return {
      todos:[],
      newTodo:{},
    }
  },
  props: {
    todoList: {
      type: Object,
    },
    status:{
      type:Object
    }
  },
  computed:{
    todoCount(){
      return this.todos.length
    }
  },
  mounted(){
    const todos = getTodos()
    this.todos = todos.filter(todo => todo.status?.id === this.status.id).sort((a,b) => a.order - b.order)
  },
  methods:{
    addTodo(){
      pushTodo({...this.newTodo, order:this.todoCount, status:this.status})
      this.newTodo={}
      const todos = getTodos()
      this.todos = todos.filter(todo => todo.status?.id === this.status.id).sort((a,b) => a.order - b.order)
    },
    saveAll(e,todos){
      todos.forEach((todo,order) => {
        editTodo({...todo,order,status:this.status})
      });

      
    }
  },

})
</script>

<style scoped>
.inputAdd{
  border: 2px dashed black;
  width: 75%;
}
.inputAdd::placeholder {
  text-align: center;
  font-size: 2rem;
}
.blur:before {
  background-color: rgba(255, 255, 255, 0.001);
  backdrop-filter: blur(10px) saturate(400%) contrast(45%) brightness(120%);
  content: '';
  height: 100%;
  position: absolute;
  width: 100%;
  top:0;
  left: 0;
}

</style>
