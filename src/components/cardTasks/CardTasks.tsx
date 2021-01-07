import React from 'react'
import {TaskType} from '../../App'
import {Task} from './task/Task'
import {DEV_VERSION} from '../../config'
import {CardHeader} from './cardHeader/CardHeader'
import {CardFooter} from './cardFooter/CardFooter'

export type CardTasksPropsType = {
  cardName: string
  tasks: Array<TaskType>
  changeTaskTitle: (id: string, title: string) => void
  markTask: (id: string) => void
}
export const CardTasks: React.FC<CardTasksPropsType> = React.memo((
  {
    cardName,
    tasks,
    changeTaskTitle,
    markTask,
  }
) => {
  DEV_VERSION && console.log('CardTasks ', cardName)

  return (
    <div>
      <CardHeader/>

      {tasks.map(t =>
        <Task
          key={t.id}
          task={t}
          changeTaskTitle={changeTaskTitle}
          markTask={markTask}
        />)}

      <CardFooter/>
    </div>
  )
})