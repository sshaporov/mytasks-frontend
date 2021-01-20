import React, {useCallback, useEffect, useMemo} from 'react'
import {Task} from './task/Task'
import {DEV_VERSION} from '../../config'
import {CardHeader} from './cardHeader/CardHeader'
import { CardProgressBar } from './cardProgressBar/CardProgressBar'
import {Card, Divider } from 'antd'
import {AddItem} from '../common/addItem/AddItem'
import {FilterTasks} from './filterTasks/FilterTasks'
import s from './CardTasks.module.css'
import {getTasksTC, TaskType} from '../../bll/tasks-reducer'
import { CardFilterValuesType } from '../../bll/cards-reducer'
import {useDispatch} from 'react-redux';

export type CardTasksPropsType = {
  cardId: string
  cardTitle: string
  cardFilter: string
  removeCard: (cardId: string) => void
  changeCardTitle: (cardId: string, title: string) => void
  tasks: Array<TaskType>
  changeTaskTitle: (taskId: string, title: string, cardId: string) => void
  changeTaskStatus: (taskId: string, cardId: string) => void
  removeTask: (taskId: string, cardId: string) => void
  addTask: (taskTitle: string, cardId: string) => void
  changeFilter: (value: CardFilterValuesType, cardId: string) => void
}
export const CardTasks: React.FC<CardTasksPropsType> = React.memo((
  {
    cardId,
    cardTitle,
    cardFilter,
    removeCard,
    changeCardTitle,
    tasks,
    changeTaskTitle,
    changeTaskStatus,
    removeTask,
    addTask,
    changeFilter,
  }
) => {
  DEV_VERSION && console.log('CardTasks ', cardTitle)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasksTC(cardId))
  },[dispatch])

  // мемоизированная функция для подсчета процента выполненых тасок
  const countTaskProgress = useMemo(() => {
    const doneCount = tasks.reduce((acc, t) => acc + Number(t.isDone), 0)
    return Math.ceil(100 / tasks.length * doneCount)
  },[tasks])

  // подбираем cardId в текущей компоненте и передаем вверх колбэк
  const changeFilterHandler = useCallback((filterValue: CardFilterValuesType) => {
    changeFilter(filterValue, cardId)
  },[changeFilter, cardId])

  const removeTaskHandler = useCallback((taskId: string) => {
    removeTask(taskId, cardId)
  },[removeTask, cardId])

  const changeTaskStatusHandler = useCallback((taskId: string) => {
    changeTaskStatus(taskId, cardId)
  },[changeTaskStatus, cardId])

  const addTaskHandler = useCallback((taskTitle: string) => {
    addTask(taskTitle, cardId)
  },[addTask, cardId])

  const changeTaskTitleHandler = useCallback((taskId: string, title: string) => {
    changeTaskTitle(taskId, title, cardId)
  },[changeTaskTitle, cardId])

  const removeCardHandler = useCallback(() => {
    removeCard(cardId)
  },[removeCard, cardId])

  const changeCardTitleHandler = useCallback((newCardTitle: string) => {
    changeCardTitle(cardId, newCardTitle)
  },[changeCardTitle, cardId])

  // логика фильтрации тасок
  let tasksForCard = tasks
  if (cardFilter === 'DONE') tasksForCard = tasks.filter(t => t.isDone)
  if (cardFilter === 'ACTIVE') tasksForCard = tasks.filter(t => !t.isDone)

  return (
    <div className={s.cardsWrapper}>
      <Card style={{width: 300, margin: 20, borderRadius: 7, boxShadow: '0px 0px 5px 1px rgba(208, 216, 243, 0.5)'}}>
        <CardHeader
          cardTitle={cardTitle}
          taskCount={tasks.length}
          removeCard={removeCardHandler}
          changeCardTitle={changeCardTitleHandler}
        />
        <CardProgressBar progress={countTaskProgress}/>

        <Divider/>

        {tasksForCard.map(task => <Task
                          key={task.id}
                          id={task.id}
                          title={task.title}
                          isDone={task.isDone}
                          changeTaskTitle={changeTaskTitleHandler}
                          changeTaskStatus={changeTaskStatusHandler}
                          removeTask={removeTaskHandler}
                        />)}

        <AddItem addItem={addTaskHandler} type={'task'}/>

        <Divider/>

        <FilterTasks changeFilter={changeFilterHandler}/>

      </Card>
    </div>
  )
})