import React, {ChangeEvent, useCallback, useState} from 'react'
import {DEV_VERSION} from '../../../config'
import {Button, Checkbox} from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons'
import s from './AddItem.module.css'

export type AddTaskPropsType = {
  addItem: (itemTitle: string) => void
}

export const AddItem: React.FC<AddTaskPropsType> = React.memo((
  {
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
              <Checkbox disabled style={{marginLeft: 10, marginRight: 10}}/>
              <input
                // s.customInput - не используется, для сброса дефолтных стилей см AddTask.module.css тег класс input
                className={s.customInput}
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
          >Add task</Button>
      }

    </div>
  )
})