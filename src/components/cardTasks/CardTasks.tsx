import React, {useMemo} from 'react'
import {FilterValueType, TaskType} from '../../App'
import {Task} from './task/Task'
import {DEV_VERSION} from '../../config'
import {CardHeader} from './cardHeader/CardHeader'
import { CardProgressBar } from './cardProgressBar/CardProgressBar'
import {Card, Divider } from 'antd'
import {AddTask} from './addTask/AddTask';
import {FilterTasks} from './filterTasks/FilterTasks';

export type CardTasksPropsType = {
  cardName: string
  tasks: Array<TaskType>
  filterTasks: Array<TaskType>
  changeTaskTitle: (id: string, title: string) => void
  markTask: (id: string) => void
  removeTask: (id: string) => void
  addTask: (title: string) => void
  changeFilter: (value: FilterValueType) => void
}
export const CardTasks: React.FC<CardTasksPropsType> = React.memo((
  {
    cardName,
    tasks,
    filterTasks,
    changeTaskTitle,
    markTask,
    removeTask,
    addTask,
    changeFilter
  }
) => {
  DEV_VERSION && console.log('CardTasks ', cardName)

  // функция для подсчета процента выполненых тасок
  const countTaskProgress = () => {
    const doneCount = tasks.reduce((acc, t) => acc + Number(t.isDone), 0)
    return Math.ceil(100 / tasks.length * doneCount)
  }
  // вызываем/считаем процент, оборачиваем в useMemo для кеширования значения и передаем в компоненту
  const progress = useMemo(() => countTaskProgress(), [tasks])

  return (
    <Card style={{width: 300, borderRadius: 7}}>
      <CardHeader cardName={'Travel list'} taskCount={tasks.length}/>
      <CardProgressBar progress={progress}/>

      <Divider />

      {filterTasks.map(t =>
        <Task
          key={t.id}
          task={t}
          changeTaskTitle={changeTaskTitle}
          markTask={markTask}
          removeTask={removeTask}
        />)}

      <AddTask addTask={addTask} />

      <Divider />

      <FilterTasks changeFilter={changeFilter}/>

    </Card>
  )
})