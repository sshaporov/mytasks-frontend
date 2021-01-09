import React, {ChangeEvent, useCallback, useState} from 'react'
import {DEV_VERSION} from '../../../config'
import {Button, Checkbox, Space} from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons'
import s from './AddTask.module.css'

export type AddTaskPropsType = {
  addTask: (title: string) => void
}

export const AddTask: React.FC<AddTaskPropsType> = React.memo((
  {
    addTask
  }
) => {
  DEV_VERSION && console.log('Add task')

  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [taskTitle, setTaskTitle] = useState<string>('')

  const onChangeTaskTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  },[taskTitle])

  const onBlurAddingTaskItem = useCallback(() => {
    if(taskTitle !== '') {
      addTask(taskTitle)
      setTaskTitle('')
    }
    setIsAdding(false)
  },[taskTitle])

  const onClickAddBtn = useCallback(() => {
    setIsAdding(true)
  },[isAdding])

  return (
    <div>

      {isAdding

        ? <div onBlur={onBlurAddingTaskItem}>
              <Checkbox disabled style={{marginLeft: 10, marginRight: 10}}/>
              <input
                // s.customInput - не используется, для сброса дефолтных стилей см AddTask.module.css тег класс input
                className={s.customInput}
                onChange={onChangeTaskTitle}
                value={taskTitle}
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