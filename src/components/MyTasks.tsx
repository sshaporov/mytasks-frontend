import React, {CSSProperties, useCallback, useEffect} from 'react'
import {DEV_VERSION} from '../config'
import {CardTasks} from './cardTasks/CardTasks'
import {Card} from 'antd'
import {AddItem} from './common/addItem/AddItem'
import {useDispatch, useSelector} from 'react-redux'
import {
  addCardTC,
  CardFilterValuesType,
  CardStateType,
  changeCardFilterAC,
  changeCardTitleTC,
  getCardsTC,
  removeCardTC,
} from '../bll/cards-reducer'
import {
  addTaskTC,
  changeTaskStatusTC,
  changeTaskTitleTC,
  removeTaskTC,
  TasksType,
} from '../bll/tasks-reducer'
import {AppStateType} from '../bll/store'
import {Redirect} from 'react-router-dom'
import './myTasks.css'

export const MyTasks = React.memo(() => {
  DEV_VERSION && console.log('MyTasks')

  const addCardBlockStyles: CSSProperties = {
    width: 300,
    height: 80,
    margin: 20,
    borderRadius: 5,
    border: 'dashed',
    borderColor: 'lightgray',
    opacity: 0.5,
    borderWidth: 2
  }

  const cards = useSelector<AppStateType, Array<CardStateType>>(state => state.cards)
  const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)
  const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

  const dispatch = useDispatch()

  useEffect(() => {
    if(isAuth) {
      dispatch(getCardsTC())
    }
  }, [dispatch, isAuth])

  const addCard = useCallback((cardTitle: string) => {
    dispatch(addCardTC(cardTitle))
  },[dispatch])

  const changeCardTitle = useCallback((cardId: string, newCardTitle: string) => {
    dispatch(changeCardTitleTC(cardId, newCardTitle))
  }, [dispatch])

  const removeCard = useCallback((cardId: string) => {
    dispatch(removeCardTC(cardId))
  }, [dispatch])

  const addTask = useCallback((taskTitle: string, cardId: string) => {
    dispatch(addTaskTC(taskTitle, cardId))
  },[dispatch])

  const changeTaskStatus = useCallback((taskId: string, taskIsChecked: boolean, cardId: string) => {
    dispatch(changeTaskStatusTC(taskId, taskIsChecked, cardId))
  },[dispatch])

  const changeTaskTitle = useCallback((taskId: string, taskTitle: string, cardId: string) => {
    dispatch(changeTaskTitleTC(taskId, taskTitle, cardId))
  },[dispatch])

  const removeTask = useCallback((taskId: string, cardId: string) => {
    dispatch(removeTaskTC(taskId, cardId))
  },[dispatch])

  const changeFilter = useCallback((filter: CardFilterValuesType, cardId: string) => {
    dispatch(changeCardFilterAC(filter, cardId))
  },[dispatch])

  if(!isAuth) {
    return <Redirect to='/login'/>
  }

  return (
    <div className='wrapper-myTasks'>
      {cards.map(card => {
        return <CardTasks
                 key={card._id}
                 card={card}
                 removeCard={removeCard}
                 changeCardTitle={changeCardTitle}
                 tasks={tasks[card._id]}
                 changeTaskTitle={changeTaskTitle}
                 changeTaskStatus={changeTaskStatus}
                 removeTask={removeTask}
                 addTask={addTask}
                 changeFilter={changeFilter}
               />
      })}
      <Card style={addCardBlockStyles}>
        <AddItem addItem={addCard} type='card'/>
      </Card>
    </div>
  )
})
