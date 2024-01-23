import { observer } from 'mobx-react-lite'
import { Ttodo } from '../utils/constants'
import Item from './Item'

const ListView = observer(({ todos }: { todos: Ttodo[] }) => {
  
  return (
    <ul className='list'>
      {todos.length ? todos
        .sort((a, b) => +a.completed - +b.completed)
        .map(({ id, title, description, completed }: Ttodo) => {
          
          return (
            <Item
              key={id}
              id={id}
              completed={completed}
              title={title}
              description={description}
            />
          )
        }) : <p>Список пуст</p>}
    </ul>
  )
})
export default ListView
