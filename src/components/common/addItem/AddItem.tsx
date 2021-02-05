import React, {ChangeEvent, useState, KeyboardEvent} from 'react'
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
    addItem,
  }
) => {
  DEV_VERSION && console.log('Add item')

  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [itemTitle, setItemTitle] = useState<string>('')

  const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value)
  }

  const addTaskItem = () => {
    if(itemTitle !== '') {
      addItem(itemTitle)
      setItemTitle('')
    }
    setIsAdding(false)
  }

  const onClickAddBtn = () => {
    setIsAdding(true)
  }

  const onClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      addTaskItem()
    }
  }


  return (
    <div>
      {isAdding
        ? <div onBlur={addTaskItem}>
            {type === 'task'
              ? <Checkbox disabled style={{marginLeft: 10, marginRight: 10}}/>
              : null}
            <input
              className={type === 'task' ? s.taskInput : s.cardInput}
              placeholder={type === 'task' ? 'Enter new task' : 'Enter new card'}
              onChange={onChangeTaskTitle}
              value={itemTitle}
              autoFocus
              onKeyPress={onClickEnter}
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