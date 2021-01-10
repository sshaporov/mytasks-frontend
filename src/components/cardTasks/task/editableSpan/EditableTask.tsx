import React, {ChangeEvent, useCallback, useState} from 'react'

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
      />
    : <span onDoubleClick={onDoubleClickSpan}>{value}</span>
})