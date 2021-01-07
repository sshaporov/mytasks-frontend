import { Checkbox } from 'antd'
import React from 'react'
import {TaskType} from '../../../App'
import {DEV_VERSION} from '../../../config'
import {EditableSpan} from '../../editableSpan/EditableSpan'

export type TaskPropsType = {
  task: TaskType
  changeTaskTitle: (id: string, title: string) => void
  markTask: (id: string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo((
  {
    task,
    changeTaskTitle,
    markTask
  }
) => {
  DEV_VERSION && console.log('Task ', task.title)

  const onChangeTaskTitle = (text: string) => {
    changeTaskTitle(task.id, text)
  }
  const onMarkTask = () => {
    markTask(task.id)
  }

  return (
    <div>
      <Checkbox checked={task.isDone} onClick={onMarkTask}/>
      <EditableSpan value={task.title} changeValue={onChangeTaskTitle}/>

    </div>
  )
})