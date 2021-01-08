import React, {ChangeEvent, useState} from 'react'

type EditableSpanPropsType = {
  value: string
  changeValue: (value: string) => void
}

export const EditableTask: React.FC<EditableSpanPropsType> = React.memo((
  {
    value,
    changeValue
  }
) => {
  let [editMode, setEditMode] = useState<boolean>(false)
  let [title, setTitle] = useState<string>(value)

  const activatedEditMode = () => {
    setEditMode(true)
  }
  const deActivatedEditMode = () => {
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
        onBlur={deActivatedEditMode}
        autoFocus={true}/>
    : <span onDoubleClick={activatedEditMode}>{value}</span>
})