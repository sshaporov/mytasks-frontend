import React, {useState} from 'react'
import {DEV_VERSION} from './config'
import {v1} from 'uuid'
import {CardTasks} from './components/cardTasks/CardTasks'
import {Card} from 'antd';
import {AddItem} from './components/common/addItem/AddItem';

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
}
export type TasksType = {
  [key: string]: Array<TaskType>
}
export type FilterValueType = 'ALL' | 'DONE' | 'ACTIVE'

const App = () => {
  DEV_VERSION && console.log('App');

  const cardId1 = v1()
  const cardId2 = v1()

  const [cards, setCards] = useState([
    {id: cardId1, title: 'Learn list', filter: 'ALL'},
    {id: cardId2, title: 'Travel list', filter: 'ALL'},
  ])

  const [tasks, setTasks] = useState<TasksType>(
    {
      [cardId1]: [
        {id: v1(), title: 'FrontEnd', isDone: true},
        {id: v1(), title: 'BackEnd', isDone: false},
        {id: v1(), title: 'Mobile', isDone: true},
        {id: v1(), title: 'DB', isDone: false},
        {id: v1(), title: 'Rest', isDone: true},
        {id: v1(), title: 'WebSocket', isDone: false},
        {id: v1(), title: 'Unit', isDone: true}
      ],
      [cardId2]: [
        {id: v1(), title: 'Passport', isDone: true},
        {id: v1(), title: 'Tickets', isDone: false},
        {id: v1(), title: 'Country', isDone: true},
        {id: v1(), title: 'Hotel', isDone: false},
        {id: v1(), title: 'Airline', isDone: true},
        {id: v1(), title: 'bus', isDone: false}
      ],
    }
  )

  const changeTaskTitle = (taskId: string, title: string, cardId: string) => {
    const tasksByCardId = tasks[cardId]
    const task = tasksByCardId.find(t => t.id === taskId)
    if (task) {
      task.title = title
      setTasks({...tasks})
    }
  }

  const markTask = (taskId: string, cardId: string) => {
    //debugger
    const tasksByCardId = tasks[cardId]
    const task = tasksByCardId.find(t => t.id === taskId)
    if (task) {
      task.isDone = !task.isDone
      setTasks({...tasks})
    }
  }

  const removeTask = (taskId: string, cardId: string) => {
    const tasksByCardId = tasks[cardId]
    tasks[cardId] = tasksByCardId.filter(t => t.id != taskId)
    setTasks({...tasks})
  }

  const addTask = (taskTitle: string, cardId: string) => {
    const task = {id: v1(), title: taskTitle, isDone: false}
    const tasksByCardId = tasks[cardId]
    tasks[cardId] = [...tasksByCardId, task]
    setTasks({...tasks})
  }

  const changeFilter = (value: FilterValueType, cardId: string) => {
    const card = cards.find(c => c.id === cardId)
    if (card) {
      card.filter = value
      setCards([...cards])
    }
  }

  const removeCard = (cardId: string) => {
    setCards(cards.filter(c => c.id !== cardId))
  }

  const addCard = (cardTitle: string) => {
    const newCardId = v1()
    const newCard = {id: newCardId, title: cardTitle, filter: 'ALL'}
    setCards([...cards, newCard])
    setTasks({...tasks, [newCardId]: []})
  }

  const duplicateCard = (cardId: string) => {
    const cardByCardId = cards.find(c => c.id === cardId)
    if(cardByCardId){
      const tasksByCardId = tasks[cardId]
      const newCardId = v1()
      const newCard = {...cardByCardId, id: newCardId}
      setCards([...cards, newCard])
      setTasks({...tasks, [newCardId]: tasksByCardId})
    }
  }

  return (
    <div>
      {cards.map(c => {

        // filter display logic
        const allTasksByCardId = tasks[c.id]
        let tasksForCard = allTasksByCardId
        if (c.filter === 'DONE') tasksForCard = allTasksByCardId.filter(t => t.isDone)
        if (c.filter === 'ACTIVE') tasksForCard = allTasksByCardId.filter(t => !t.isDone)

        return <CardTasks
                  cardId={c.id}
                  cardTitle={c.title}
                  removeCard={removeCard}
                  tasks={tasksForCard}
                  changeTaskTitle={changeTaskTitle}
                  markTask={markTask}
                  removeTask={removeTask}
                  duplicateCard={duplicateCard}
                  addTask={addTask}
                  changeFilter={changeFilter}
                />})
      }

      <Card style={{width: 300, margin: 20, borderRadius: 7, boxShadow: '0px 0px 5px 1px rgba(208, 216, 243, 0.5)'}}>
        <AddItem addItem={addCard} type={'card'}/>
      </Card>

    </div>
  )
}

export default App;
