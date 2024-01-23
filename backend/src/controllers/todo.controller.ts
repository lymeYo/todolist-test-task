import Todo, { TodoModel } from "../models/todo";

const todosPerPage = 1

export const getAllTodos = async (req, res) => {
  try {
    let page = +req.query.page
    let todos: TodoModel[] | null = await Todo.findAll()
    if (!todos) throw new Error()

    if (page && page > 0) {
      const pages = Math.ceil(todos.length / todosPerPage)
      if (page > pages) page = pages
      todos = todos.slice((page - 1) * todosPerPage, page * todosPerPage)
    }

    todos.sort((a, b) => - a.id + b.id)


    return res.json(todos)
  } catch(err) {
    console.log(err);
    return res
      .status(500)
      .send("Не поулчается получить todo");
  }
}

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const todo: TodoModel | null = await Todo.create({
      title,
      description,
      completed: false
    })

    if (!todo) throw new Error()

    await todo.save()
    

    return res.json(todo)
  } catch(err) {
    console.log(err);
    return res
      .status(500)
      .send("Не поулчается создать todo в данный момент");
  }
}

export const updateTodo = async (req, res) => {
  try {
    const { title, description, completed, id } = req.body;
    console.log(req.body);
    
    const todo: TodoModel | null = await Todo.findOne({ where: { id } })
    if (!todo) throw new Error()

    todo.title = title
    todo.description = description
    todo.completed = completed
    await todo.save()

    return res.json(todo)
  } catch(err) {
    console.log(err);
    return res
      .status(500)
      .send("Не поулчается изменить todo в данный момент");
  }
}

export const removeTodo = async (req, res) => {
  try {
    const { id } = req.body;

    const todo: TodoModel | null = await Todo.findOne({ where: { id } })
    if (!todo) throw new Error()

    await todo.destroy()

    return res.send('succesfull')
  } catch(err) {
    console.log(err);
    return res
      .status(500)
      .send("Не поулчается удалить todo в данный момент");
  }
}