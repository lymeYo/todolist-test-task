import { Ttodo, serverPort } from "../constants"

const fetchTodos = async (): Promise<Ttodo[]> => {
  try {
    const res = await fetch(`http://localhost:${serverPort}/todo/all`)
    const todos = await res.json()

    return todos
  } catch(err) {
    console.error(err);
    return []
  }
}

export default fetchTodos