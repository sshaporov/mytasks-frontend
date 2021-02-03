import React, {CSSProperties, useCallback, useEffect, useMemo} from 'react'
import {Task} from './task/Task'
import {DEV_VERSION} from '../../config'
import {CardHeader} from './cardHeader/CardHeader'
import {CardProgressBar} from './cardProgressBar/CardProgressBar'
import {Card, Divider} from 'antd'
import {AddItem} from '../common/addItem/AddItem'
import {FilterTasks} from './filterTasks/FilterTasks'
import {getTasksTC} from '../../bll/tasks-reducer'
import {CardFilterValuesType, CardStateType} from '../../bll/cards-reducer'
import {useDispatch} from 'react-redux'
import {TaskType} from '../../dal/tasks-api'

export type CardTasksPropsType = {
  card: CardStateType
  removeCard: (cardId: string) => void
  changeCardTitle: (cardId: string, title: string) => void
  tasks: Array<TaskType>
  changeTaskTitle: (taskId: string, title: string, cardId: string) => void
  changeTaskStatus: (taskId: string, taskStatus: boolean, cardId: string) => void
  removeTask: (taskId: string, cardId: string) => void
  addTask: (taskTitle: string, cardId: string) => void
  changeFilter: (value: CardFilterValuesType, cardId: string) => void
}
export const CardTasks: React.FC<CardTasksPropsType> = React.memo((
  {
    card,
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
  DEV_VERSION && console.log('CardTasks ', card.title)

  const cardStyles: CSSProperties = {
    width: 300,
    margin: 20,
    borderRadius: 5,
    boxShadow: '0px 0px 10px 3px rgba(208, 216, 243, 0.4)'
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasksTC(card._id))
  },[dispatch, card])

  // Memoizing function for calculating progress
  const countTaskProgress = useMemo(() => {
    const doneCount = tasks.reduce((acc, task) => acc + Number(task.checked), 0)
    return Math.ceil(100 / tasks.length * doneCount)
  },[tasks])

  // take cardId in current component and use callback
  const changeFilterHandler = useCallback((filterValue: CardFilterValuesType) => {
    changeFilter(filterValue, card._id)
  }, [changeFilter, card])

  const removeTaskHandler = useCallback((taskId: string) => {
    removeTask(taskId, card._id)
  }, [removeTask, card])

  const changeTaskStatusHandler = useCallback((taskId: string, taskIsChecked: boolean) => {
    changeTaskStatus(taskId, taskIsChecked, card._id)
  }, [changeTaskStatus, card])

  const addTaskHandler = useCallback((taskTitle: string) => {
    addTask(taskTitle, card._id)
  }, [addTask, card])

  const changeTaskTitleHandler = useCallback((taskId: string, title: string) => {
    changeTaskTitle(taskId, title, card._id)
  }, [changeTaskTitle, card])

  const removeCardHandler = useCallback(() => {
    removeCard(card._id)
  }, [removeCard, card])

  const changeCardTitleHandler = useCallback((newCardTitle: string) => {
    changeCardTitle(card._id, newCardTitle)
  }, [changeCardTitle, card])

  // filter logic
  let tasksForCard = tasks
  if (card.filter === 'DONE') tasksForCard = tasks.filter(task => task.checked)
  if (card.filter === 'ACTIVE') tasksForCard = tasks.filter(task => !task.checked)

  return (
    <div>
      <Card style={cardStyles}>
        <CardHeader
          cardTitle={card.title}
          taskCount={tasks.length}
          removeCard={removeCardHandler}
          changeCardTitle={changeCardTitleHandler}
        />
        <CardProgressBar progress={countTaskProgress}/>
        <Divider/>
        {tasksForCard.map(task => <Task
                                    key={task._id}
                                    id={task._id}
                                    title={task.title}
                                    isChecked={task.checked}
                                    changeTaskTitle={changeTaskTitleHandler}
                                    changeTaskStatus={changeTaskStatusHandler}
                                    removeTask={removeTaskHandler}
                                  />
        )}
        <AddItem addItem={addTaskHandler} type={'task'}/>
        <Divider/>
        <FilterTasks changeFilter={changeFilterHandler}/>
      </Card>
    </div>
  )
})