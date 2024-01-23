import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'
import { Checkbox, IconButton, TextareaAutosize } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { getTodoStore } from '../store/TodoStore'

type ItemProps = {
  id: number
  completed: boolean
  title: string
  description: string
}

const Item = observer(({ id, completed, title, description }: ItemProps) => {
  const { editTodo, removeTodo } = getTodoStore()
  
  const [isEdit, setEdit] = useState(false)

  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  const handleRemove = () => {
    removeTodo(id)
  }

  const handleEdit = useCallback(() => {
    const title = titleRef.current?.value ?? ''
    const description = descriptionRef.current?.value ?? ''

    editTodo(id, title, description, completed)

    setEdit(false) 
  }, [completed])

  const handleToggle = useCallback(() => {
    editTodo(id, title, description, !completed)
  }, [completed, title, description])

  useEffect(() => {
    if (isEdit) titleRef.current?.focus()
  }, [isEdit])


  return (
    <li className={isEdit ? 'list-item list-item_edit' : 'list-item'}>
      <Checkbox
        onClick={handleToggle}
        edge='start'
        checked={completed}
        inputProps={{ 'aria-labelledby': String(id) }}
      />
      <div className='list-item__body' id={String(id)}>
        <input defaultValue={title} type='text' className='list-item__title' disabled={!isEdit} ref={titleRef} />
        
        <TextareaAutosize
            defaultValue={description}
            disabled={!isEdit}
            minRows={3}
            maxRows={10}
            placeholder='Описание...'
            ref={descriptionRef}
          />
      </div>
      <div>
        <IconButton onClick={handleRemove} aria-label='delete'>
          <DeleteIcon />
        </IconButton>
        {isEdit ? (
          <IconButton onClick={handleEdit} aria-label='edit'>
            <DoneIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => setEdit(true)} aria-label='done'>
            <EditIcon />
          </IconButton>
        )}
      </div>
    </li>
  )
})
export default Item
