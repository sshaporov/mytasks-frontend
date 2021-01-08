import React from 'react'
import {TaskType} from '../../App'
import {Task} from './task/Task'
import {DEV_VERSION} from '../../config'
import {CardHeader} from './cardHeader/CardHeader'
import {CardFooter} from './cardFooter/CardFooter'
import { CardProgressBar } from './cardProgressBar/CardProgressBar'
import { AddTask } from './task/addTask/AddTask'

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

  //useMemo
  const countTaskProgress = () => {
    const doneCount = tasks.reduce((acc, t) => acc + Number(t.isDone), 0)
    return Math.ceil(100 / tasks.length * doneCount)
  }

  return (
    <div>
      <CardHeader cardName={'Travel list'} taskCount={tasks.length}/>
      <CardProgressBar progress={countTaskProgress()}/>

      {tasks.map(t =>
        <Task
          key={t.id}
          task={t}
          changeTaskTitle={changeTaskTitle}
          markTask={markTask}
        />)}

      <AddTask/>

      <CardFooter/>
    </div>
  )
})