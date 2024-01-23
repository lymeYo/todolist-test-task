import { Ttodo, serverPort } from '../constants'

const updateTodo = async (id: number, title: string, description: string, completed: boolean): Promise<Ttodo | null> => {
  try {
    const res = await fetch(`http://localhost:${serverPort}/todo/edit`, {
      method: 'PUT',
      body: JSON.stringify({ id, title, description, completed }),
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

export default updateTodo
