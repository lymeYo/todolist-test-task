import { Ttodo, serverPort } from '../constants'

const createTodo = async (title: string, description: string): Promise<Ttodo | null> => {
  try {
    const res = await fetch(`http://localhost:${serverPort}/todo/create`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    const todo = await res.json()

    return todo
  } catch (err) {
    console.error(err)
    return null
  }
}

export default createTodo
