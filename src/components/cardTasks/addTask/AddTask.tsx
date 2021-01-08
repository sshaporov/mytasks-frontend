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
  // const [taskChecked, setTaskChecked] = useState<boolean>(false)

  const onChangeTaskTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  },[taskTitle])

  const onBlurAddingTaskItem = () => {
    if(taskTitle !== '') {
      addTask(taskTitle)
      setTaskTitle('')
    }
    setIsAdding(false)
  }

  return (
    <div>

      {isAdding

        ? <div className={s.addItemWrapper} onBlur={onBlurAddingTaskItem}>
            <Space>
              <Checkbox disabled
                // onChange={() => setTaskChecked(!taskChecked)}
                // checked={taskChecked}
              />
              <input
                onChange={onChangeTaskTitle}
                value={taskTitle}
                autoFocus
              />
            </Space>
          </div>

        : <Button
            type="text"
            icon={<PlusCircleOutlined/>}
            block
            onClick={() => setIsAdding(true)}
          >Add task</Button>
      }

    </div>
  )
})