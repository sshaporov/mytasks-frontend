import React, {ChangeEvent, useState} from 'react'
import s from './EditableItem.module.css'
import {DEV_VERSION} from '../../../config';

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
  DEV_VERSION && console.log('EditableItem')

  let [title, setTitle] = useState<string>(value)

  const onDoubleClickSpan = () => {
    setEditMode(true)
  }

  const onBlurInput = () => {
    changeValue(title)
    setEditMode(false)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

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