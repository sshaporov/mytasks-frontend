import React from 'react'
import {FilterValueType, TaskType} from '../../App'
import {Task} from './task/Task'
import {DEV_VERSION} from '../../config'
import {CardHeader} from './cardHeader/CardHeader'
import { CardProgressBar } from './cardProgressBar/CardProgressBar'
import {Card, Divider } from 'antd'
import {AddItem} from '../common/addItem/AddItem'
import {FilterTasks} from './filterTasks/FilterTasks'
import s from './CardTasks.module.css'

export type CardTasksPropsType = {
  cardId: string
  cardTitle: string
  removeCard: (cardId: string) => void
  changeCardTitle: (cardId: string, title: string) => void
  tasks: Array<TaskType>
  changeTaskTitle: (taskId: string, title: string, cardId: string) => void
  markTask: (taskId: string, cardId: string) => void
  removeTask: (taskId: string, cardId: string) => void
  addTask: (taskTitle: string, cardId: string) => void
  changeFilter: (value: FilterValueType, cardId: string) => void
}
export const CardTasks: React.FC<CardTasksPropsType> = React.memo((
  {
    cardId,
    cardTitle,
    removeCard,
    changeCardTitle,
    tasks,
    changeTaskTitle,
    markTask,
    removeTask,
    addTask,
    changeFilter,
  }
) => {
  DEV_VERSION && console.log('CardTasks ', cardTitle)

  // функция для подсчета процента выполненых тасок
  const countTaskProgress = () => {
    const doneCount = tasks.reduce((acc, t) => acc + Number(t.isDone), 0)
    return Math.ceil(100 / tasks.length * doneCount)
  }

  // подбираем cardId в текущей компоненте и передаем вверх колбэк
  const changeFilterHandler = (filterValue: FilterValueType) => {
    changeFilter(filterValue, cardId)
  }

  const removeTaskHandler = (taskId: string) => {
    removeTask(taskId, cardId)
  }

  const markTaskHandler = (taskId: string) => {
    markTask(taskId, cardId)
  }

  const addTaskHandler = (taskTitle: string) => {
    addTask(taskTitle, cardId)
  }

  const changeTaskTitleHandler = (taskId: string, title: string) => {
    changeTaskTitle(taskId, title, cardId)
  }

  const removeCardHandler = () => {
    removeCard(cardId)
  }

  const changeCardTitleHandler = (newCardTitle: string) => {
    changeCardTitle(cardId, newCardTitle)
  }

  return (
    <div className={s.cardsWrapper}>
      <Card style={{width: 300, margin: 20, borderRadius: 7, boxShadow: '0px 0px 5px 1px rgba(208, 216, 243, 0.5)'}}>
        <CardHeader
          cardTitle={cardTitle}
          taskCount={tasks.length}
          removeCard={removeCardHandler}
          changeCardTitle={changeCardTitleHandler}
        />
        <CardProgressBar progress={countTaskProgress()}/>

        <Divider/>

        {tasks.map(task => <Task
                          key={task.id}
                          id={task.id}
                          title={task.title}
                          isDone={task.isDone}
                          changeTaskTitle={changeTaskTitleHandler}
                          markTask={markTaskHandler}
                          removeTask={removeTaskHandler}
                        />)}

        <AddItem addItem={addTaskHandler} type={'task'}/>

        <Divider/>

        <FilterTasks changeFilter={changeFilterHandler}/>

      </Card>
    </div>
  )
})