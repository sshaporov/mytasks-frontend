import React, {ChangeEvent, useState} from 'react'
import {DEV_VERSION} from '../../../config'
import {Button, Checkbox} from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons'
import s from './AddItem.module.css'

export type AddTaskPropsType = {
  type: 'card' | 'task'
  addItem: (itemTitle: string) => void
}

export const AddItem: React.FC<AddTaskPropsType> = React.memo((
  {
    type,
    addItem
  }
) => {
  DEV_VERSION && console.log('Add task')

  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [itemTitle, setItemTitle] = useState<string>('')

  const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value)
  }

  const onBlurAddingTaskItem = () => {
    if(itemTitle !== '') {
      addItem(itemTitle)
      setItemTitle('')
    }
    setIsAdding(false)
  }

  const onClickAddBtn = () => {
    setIsAdding(true)
  }

  return (
    <div>

      {isAdding

        ? <div onBlur={onBlurAddingTaskItem}>
          {type === 'task'
            ? <Checkbox disabled style={{marginLeft: 10, marginRight: 10}}/>
            : null}
          <input
            // s.customInput - не используется, для сброса дефолтных стилей см AddTask.module.css тег класс input
            className={type === 'task' ? s.taskInput : s.cardInput}
            placeholder={type === 'task' ? 'Enter new task' : 'Enter new card'}
            onChange={onChangeTaskTitle}
            value={itemTitle}
            autoFocus
          />
        </div>

        : <Button
            type="text"
            icon={<PlusCircleOutlined/>}
            block
            onClick={onClickAddBtn}
          >Add {type}</Button>
      }

    </div>
  )
})