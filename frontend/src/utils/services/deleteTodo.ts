import { Ttodo, serverPort } from '../constants'

const deleteTodo = async (id: number): Promise<boolean> => {
  try {
    const res = await fetch(`http://localhost:${serverPort}/todo/remove`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(res);
    
    return true
  } catch (err) {
    return false
  }
}

export default deleteTodo
