import React, {useCallback, useEffect} from 'react'
import {DEV_VERSION} from './config'
import {CardTasks} from './components/cardTasks/CardTasks'
import {Button, Card} from 'antd'
import {AddItem} from './components/common/addItem/AddItem'
import {useDispatch, useSelector} from 'react-redux'
import {
  addCardAC,
  CardFilterType,
  CardType,
  changeCardFilterAC,
  changeCardTitleAC, getCardsTC,
  removeCardAC
} from './bll/cards-reducer'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from './bll/tasks-reducer'
import {AppStateType} from './bll/store'


const App = () => {
  DEV_VERSION && console.log('App')

  const cards = useSelector<AppStateType, Array<CardType>>(state => state.cards)
  const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)
  const dispatch = useDispatch()

  const addCard = useCallback((cardTitle: string) => {
    dispatch(addCardAC(cardTitle))
  },[dispatch])

  const changeCardTitle = useCallback((cardId: string, newCardTitle: string) => {
    dispatch(changeCardTitleAC(cardId,newCardTitle))
  }, [dispatch])

  const removeCard = useCallback((cardId: string) => {
    dispatch(removeCardAC(cardId))
  }, [dispatch])

  const changeTaskStatus = useCallback((taskId: string, cardId: string) => {
    dispatch(changeTaskStatusAC(taskId, cardId))
  },[dispatch])

  const addTask = useCallback((taskTitle: string, cardId: string) => {
    dispatch(addTaskAC(taskTitle, cardId))
  },[dispatch])

  const changeTaskTitle = useCallback((taskId: string, taskTitle: string, cardId: string) => {
    dispatch(changeTaskTitleAC(taskId, taskTitle, cardId))
  },[dispatch])

  const removeTask = useCallback((taskId: string, cardId: string) => {
    dispatch(removeTaskAC(taskId, cardId))
  },[dispatch])

  const changeFilter = useCallback((filter: CardFilterType, cardId: string) => {
    dispatch(changeCardFilterAC(filter,cardId))
  },[dispatch])

  // ********************************************* server test
  const onClickTestBtn = () => {
    dispatch(getCardsTC())
  }
  // *********************************************

  return (
    <div>
      {cards.map(card => {
        // получаем все таски для текущей карточки и прокидываем их в CardTasks как tasks={tasksForCard}
        const tasksForCard = tasks[card.id]

        return <CardTasks
                  key={card.id}
                  cardId={card.id}
                  cardTitle={card.title}
                  cardFilter={card.filter}
                  removeCard={removeCard}
                  changeCardTitle={changeCardTitle}
                  tasks={tasksForCard}
                  changeTaskTitle={changeTaskTitle}
                  changeTaskStatus={changeTaskStatus}
                  removeTask={removeTask}
                  addTask={addTask}
                  changeFilter={changeFilter}
                />})
      }

      <Card style={{width: 300, margin: 20, borderRadius: 7, boxShadow: '0px 0px 5px 1px rgba(208, 216, 243, 0.5)'}}>
        <AddItem addItem={addCard} type={'card'}/>
      </Card>

      <Button onClick={onClickTestBtn}>Test server</Button>

    </div>
  )
}

export default App;
