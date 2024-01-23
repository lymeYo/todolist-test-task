import { makeAutoObservable, runInAction } from 'mobx'
import { Ttodo } from '../utils/constants'
import fetchTodos from '../utils/services/fetchTodos'
import updateTodo from '../utils/services/updateTodo'
import deleteTodo from '../utils/services/deleteTodo'
import createTodo from '../utils/services/createTodo'

export class ClassTodoStore {
  todos: Ttodo[] = []
  isLoading = true
  
  constructor() {
    makeAutoObservable(this)
  }

  loadTodos = async () => {
    this.isLoading = true
    const todos = await fetchTodos()
    runInAction(() => {
      this.todos = todos
      this.isLoading = false
    })
  }

  addTodo = async (title: string, description: string) => {
    const todo = await createTodo(title, description)
    if (todo) this.todos = [todo, ...this.todos]
  }

  editTodo = async (id: number, title: string, description: string, completed: boolean) => {
    await updateTodo(id, title, description, completed)
    
    this.todos = this.todos.map(todo => {
      if (todo.id != id) return todo
      todo.title = title
      todo.description = description
      todo.completed = completed
      return todo
    })
    
  }

  removeTodo = async (id: number) => {
    await deleteTodo(id)
    this.todos = this.todos.filter(todo => todo.id != id)
  }
}

const TodoStore = new ClassTodoStore()

export const getTodoStore = () => TodoStore

export default TodoStore
