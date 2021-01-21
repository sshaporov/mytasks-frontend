import React, {useCallback, useEffect} from 'react'
import {DEV_VERSION} from './config'
import {CardTasks} from './components/cardTasks/CardTasks'
import {Button, Card} from 'antd'
import {AddItem} from './components/common/addItem/AddItem'
import {useDispatch, useSelector} from 'react-redux'
import {
  addCardAC, addCardTC,
  CardFilterValuesType,
  CardStateType,
  changeCardFilterAC,
  changeCardTitleAC, changeCardTitleTC, getCardsTC,
  removeCardAC, removeCardTC
} from './bll/cards-reducer'
import {
  addTaskAC,
  addTaskTC,
  changeTaskStatusAC,
  changeTaskStatusTC,
  changeTaskTitleAC,
  removeTaskAC,
  TasksType
} from './bll/tasks-reducer'
import {AppStateType} from './bll/store'


const App = () => {
  DEV_VERSION && console.log('App')

  const cards = useSelector<AppStateType, Array<CardStateType>>(state => state.cards)
  const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCardsTC())
  }, [dispatch])

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

  const changeTaskStatus = useCallback((taskId: string, taskStatus: boolean, cardId: string) => {
    // dispatch(changeTaskStatusAC(taskId, cardId))
    dispatch(changeTaskStatusTC(taskId, taskStatus, cardId))
    console.log(taskId, taskStatus, cardId)
  },[dispatch])






  const changeTaskTitle = useCallback((taskId: string, taskTitle: string, cardId: string) => {
    dispatch(changeTaskTitleAC(taskId, taskTitle, cardId))
  },[dispatch])

  const removeTask = useCallback((taskId: string, cardId: string) => {
    dispatch(removeTaskAC(taskId, cardId))
  },[dispatch])

  const changeFilter = useCallback((filter: CardFilterValuesType, cardId: string) => {
    dispatch(changeCardFilterAC(filter,cardId))
  },[dispatch])

  // ********************************************* server test
  const onClickTestBtnGet = () => {
    dispatch(getCardsTC())
  }
  // const onClickTestBtnAdd = () => {
  //   dispatch(createCardTC())
  // }
  // *********************************************

  return (
    <div>
      {cards.map(card => {
        // получаем все таски для текущей карточки и прокидываем их в CardTasks как tasks={tasksForCard}
        // не забыть сменить let -> const - удалить !!!
        let tasksForCard = tasks[card._id]

        // заглушка на undefined для - удалить!!!
        if (tasksForCard === undefined) {
          tasksForCard = []
        }

        return <CardTasks
                  key={card._id}
                  cardId={card._id}
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

      <Button onClick={onClickTestBtnGet}>Get tasks</Button>
      {/*<Button onClick={onClickTestBtnAdd}>Add mock task</Button>*/}

    </div>
  )
}

export default App
