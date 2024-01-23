import { IconButton, TextareaAutosize } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useCallback, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { getTodoStore } from '../../store/TodoStore'
import { maxDescriptionLength, maxTitleLength } from '../../utils/constants'
import LengthCounter from './LengthCounter'

const errorMessages = {
  emptyTitle: 'Отсутствует название!',
  largeTitle: 'Слишком длинное название',
  largeDescription: 'Слишком длинное описание'
}

const InputArea = observer(() => {
  const { addTodo } = getTodoStore()

  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  const errorMessRef = useRef('')

  const [isErrorMessShow, setErrorMessShow] = useState(false)

  const [titleLength, setTitleLength] = useState(0)
  const [descriptionLength, setDescriptionLength] = useState(0)

  const handleAddTodo = async () => {
    const titleEl = titleRef.current
    const descriptionEl = descriptionRef.current
    if (!titleEl || !descriptionEl) return

    const descripLength = descriptionEl.value.trim().length
    const titleLength = titleEl.value.trim().length

    if (
      !titleEl.value.trim() ||
      descripLength > maxDescriptionLength ||
      titleLength > maxTitleLength
    ) {
      if (!titleEl.value.trim()) errorMessRef.current = errorMessages.emptyTitle
      else if (descripLength > maxDescriptionLength)
        errorMessRef.current = errorMessages.largeDescription
      else if (titleLength > maxTitleLength) errorMessRef.current = errorMessages.largeTitle

      setErrorMessShow(true)
      return
    }

    await addTodo(titleEl.value.trim(), descriptionEl.value.trim())

    titleEl.value = ''
    descriptionEl.value = ''

    handleInputsChange() //чтобы сбросить сообщение об ошибке и счетчик символов 
  }

  const handleInputsChange = useCallback(() => {
    if (!titleRef.current || !descriptionRef.current) return
    const titleValue = titleRef.current?.value.trim()
    const descriptionValue = descriptionRef.current?.value.trim()

    setTitleLength(titleValue.length)
    setDescriptionLength(descriptionValue.length)

    if (!isErrorMessShow) return    

    if (errorMessRef.current == errorMessages.emptyTitle && titleValue) setErrorMessShow(false)
    else if (errorMessRef.current == errorMessages.largeTitle && titleValue.length < maxTitleLength)
      setErrorMessShow(false)
    else if (
      errorMessRef.current == errorMessages.largeDescription &&
      descriptionValue.length < maxDescriptionLength
    )

      setErrorMessShow(false)
  }, [isErrorMessShow])

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (
        event.code == 'Enter' &&
        titleRef.current == document.activeElement &&
        descriptionRef.current
      ) {
        descriptionRef.current.focus()
        event.preventDefault()
      }
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [])

  return (
    <div className='inputs-area'>
      <div className='inputs-block'>
        <div className='inputs-input-wrapper'>
          <LengthCounter length={titleLength} maxLength={maxTitleLength} />
          <input type='text' placeholder='Название' ref={titleRef} onChange={handleInputsChange} />
        </div>
        <div className='inputs-textarea-wrapper'>
          <LengthCounter length={descriptionLength} maxLength={maxDescriptionLength} />
          <TextareaAutosize
            minRows={3}
            maxRows={10}
            placeholder='Описание...'
            ref={descriptionRef}
            onChange={handleInputsChange}
          />
        </div>
        {isErrorMessShow && <p className='error-mess'>{errorMessRef.current}</p>}
      </div>
      <div>
        <IconButton size='large' onClick={handleAddTodo}>
          <AddIcon fontSize='large' />
        </IconButton>
      </div>
    </div>
  )
})
export default InputArea
