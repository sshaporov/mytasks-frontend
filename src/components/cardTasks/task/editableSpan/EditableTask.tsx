import React, {ChangeEvent, useEffect, useState} from 'react'

type EditableSpanPropsType = {
  value: string
  changeValue: (value: string) => void
  editMode: boolean,
  setEditMode: (flag: boolean) => void
}

export const EditableTask: React.FC<EditableSpanPropsType> = React.memo((
  {
    value,
    changeValue,
    editMode,
    setEditMode,
  }
) => {
  let [title, setTitle] = useState<string>(value)

  const onDoubleClickSpan = () => {
    setEditMode(true)
  }
  const onBlurInput = () => {
    setEditMode(false)
    changeValue(title)
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode
    ? <input
        value={title}
        onChange={onChangeHandler}
        onBlur={onBlurInput}
        autoFocus={true}/>
    : <span onDoubleClick={onDoubleClickSpan}>{value}</span>
})