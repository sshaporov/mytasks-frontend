import React, {ChangeEvent, useCallback, useState} from 'react'
import s from './EditableItem.module.css'

type EditableSpanPropsType = {
  type: 'card' | 'task'
  value: string
  changeValue: (value: string) => void
  editMode: boolean,
  setEditMode: (flag: boolean) => void
}

export const EditableItem: React.FC<EditableSpanPropsType> = React.memo((
  {
    type,
    value,
    changeValue,
    editMode,
    setEditMode,
  }
) => {
  let [title, setTitle] = useState<string>(value)

  const onDoubleClickSpan = useCallback(() => {
    setEditMode(true)
  }, [])

  const onBlurInput = useCallback(() => {
    changeValue(title)
    setEditMode(false)
  }, [title])

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }, [])

  return editMode
    ? <input
        value={title}
        onChange={onChangeHandler}
        onBlur={onBlurInput}
        autoFocus={true}
        className={type === 'task' ? s.taskInput : s.cardInput}
    />
    : <span onDoubleClick={onDoubleClickSpan} className={type === 'card' ? s.cardText : undefined}>{value}</span>
})