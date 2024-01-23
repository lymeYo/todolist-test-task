import { CircularProgress } from '@mui/material'
import InputsArea from './InputsArea'
import ListView from './ListView'
import {  useEffect, useMemo, useState } from 'react'
import { TtodosViewMode } from '../utils/constants'
import Filters from './Filters'
import { getTodoStore } from '../store/TodoStore'
import { observer } from 'mobx-react-lite'


const List = observer(() => {
  const { loadTodos, isLoading, todos } = getTodoStore()
  const [todosViewMode, setTodosViewMode] = useState<TtodosViewMode>('all')

  const viewTodos = useMemo(
    () =>
      todos.filter(
        todo =>
          todosViewMode == 'all' ||
          (todosViewMode == 'completed' && todo.completed) ||
          (todosViewMode == 'active' && !todo.completed)
      ),
    [todosViewMode, todos]
  )

  useEffect(() => {
    loadTodos()
  }, [])

  return (
    <div className='list-wrapper'>
      <h2>Создать заметку</h2>
      <InputsArea />
      {isLoading ? (
        <div className='loader-wrapper'>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Filters todosViewMode={todosViewMode} setTodosViewMode={setTodosViewMode} />
          <ListView todos={viewTodos} />
        </>
      )}
    </div>
  )
})

export default List
