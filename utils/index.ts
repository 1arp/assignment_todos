import { v4 } from "uuid";

interface Status{
  id:string;
  name:string;
  color:string;
}

interface Todo{
  id:string;
  title:string;
  description?:string;
  status:Status;
  order:number;
}

export const getStatuses:Status[] | any =  () => {
  if(process.server) return [];

  let statusesString = localStorage.getItem("statuses")
  
  if(!statusesString){
    const newStatuses:Status[] = [{
      id:v4(),
      name:"Not Started",
      color:"pink"
    }]
    localStorage.setItem("statuses", JSON.stringify(newStatuses))
    statusesString = localStorage.getItem("statuses")
  }
  // @ts-ignore
  const statuses = JSON.parse(statusesString)
  return statuses
}

export const pushStatus = (status) => {
  const statuses = getStatuses()
  status.id = status.id ? status.id : v4()
  statuses.push(JSON.parse(JSON.stringify(status)))
  localStorage.setItem("statuses", JSON.stringify (statuses))
}

export const getTodos= () => {
  if(process.server) return undefined;

  let todosString = localStorage.getItem("todos")

  if(!todosString){
    localStorage.setItem("todos",JSON.stringify(JSON.parse('[]')))
    todosString = localStorage.getItem("todos")
  }
  // @ts-ignore
  const todos = JSON.parse(todosString)
  return todos
}

export const getTodo = (id) => {
  const todos = getTodos()
  return todos.find(todo => todo.id == id)
}

export const pushTodo = (todo:Todo) => {
  const todos = getTodos()
  todo.id = todo.id ? todo.id : v4()
  todos.push(JSON.parse(JSON.stringify(todo)) )
  localStorage.setItem("todos", JSON.stringify (todos))
}

export const editTodo = (editedTodo:Todo) => {
  const todos = getTodos()
  const editedTodos = todos.map(todo => {
    return todo.id === editedTodo.id ? editedTodo: todo 
  })
  localStorage.setItem("todos", JSON.stringify(editedTodos))
}

export const deleteTodo = (todoId) => {
  const todos = getTodos()
  const editedTodos = todos.filter(todo => {
    return todo.id !== todoId
  })
  localStorage.setItem("todos", JSON.stringify(editedTodos))
}