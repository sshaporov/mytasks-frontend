import React, {useCallback, useState} from 'react'
import {DEV_VERSION} from './config'
import {v1} from 'uuid'
import {CardTasks} from './components/cardTasks/CardTasks'
import {AddCard} from './components/cardTasks/addCard/AddCard';
import {Card} from 'antd';

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
}
export type FilterValueType = 'ALL' | 'DONE' | 'ACTIVE'

const App = React.memo(() => {
  DEV_VERSION && console.log('App');

  const cardId1 = v1()
  const cardId2 = v1()
  const [cards, setCards] = useState([
    {id: cardId1, title: 'Learn list', filter: 'ALL'},
    {id: cardId2, title: 'Travel list', filter: 'ALL'},
  ])

  const [tasks, setTasks] = useState(
    {
      [cardId1]:
        [{id: v1(), title: 'FrontEnd', isDone: true},
        {id: v1(), title: 'BackEnd', isDone: false},
        {id: v1(), title: 'Mobile', isDone: true},
        {id: v1(), title: 'DB', isDone: false},
        {id: v1(), title: 'Rest', isDone: true},
        {id: v1(), title: 'WebSocket', isDone: false},
        {id: v1(), title: 'Unit', isDone: true}],
      [cardId2]:
        [{id: v1(), title: 'Passport', isDone: true},
        {id: v1(), title: 'Tickets', isDone: false},
        {id: v1(), title: 'Country', isDone: true},
        {id: v1(), title: 'Hotel', isDone: false},
        {id: v1(), title: 'Airline', isDone: true},
        {id: v1(), title: 'bus', isDone: false}]
    }
  )

  const changeTaskTitle = useCallback((taskId: string, title: string, cardId: string) => {
    const tasksByCardId = tasks[cardId]
    const task = tasksByCardId.find(t => t.id === taskId)
    if (task) {
      task.title = title
      setTasks({...tasks})
    }
  }, [tasks])

  const markTask = useCallback((taskId: string, cardId: string) => {
    const tasksByCardId = tasks[cardId]
    const task = tasksByCardId.find(t => t.id === taskId)
    if (task) {
      task.isDone = !task.isDone
      setTasks({...tasks})
    }
  },[tasks])

  const removeTask = useCallback((taskId: string, cardId: string) => {
    const tasksByCardId = tasks[cardId]
    tasks[cardId] = tasksByCardId.filter(t => t.id != taskId)
    setTasks({...tasks})
  }, [tasks])

  const addTask = useCallback((taskTitle: string, cardId: string) => {
    const task: TaskType = {id: v1(), title: taskTitle, isDone: false}
    const tasksByCardId = tasks[cardId]
    // const newArrCardsByTaskId = [...cardsByTaskId]
    // newArrCardsByTaskId.push(task)
    tasks[cardId] = [...tasksByCardId, task]
    setTasks({...tasks})
  }, [tasks])

  const changeFilter = (value: FilterValueType, cardId: string) => {
    const card = cards.find(c => c.id === cardId)
    if (card) {
      card.filter = value
      setCards([...cards])
    }
  }

  return (
    <div>
      {cards.map(c => {

        // filter display logic
        let allTasksByCardId = tasks[c.id]
        let tasksForCard = allTasksByCardId
        if (c.filter === 'DONE') tasksForCard = allTasksByCardId.filter(t => t.isDone)
        if (c.filter === 'ACTIVE') tasksForCard = allTasksByCardId.filter(t => !t.isDone)

        return <CardTasks
                  cardId={c.id}
                  tasks={tasksForCard}
                  cardName={'Travel Tasks'}
                  changeTaskTitle={changeTaskTitle}
                  markTask={markTask}
                  removeTask={removeTask}
                  addTask={addTask}
                  changeFilter={changeFilter}
                />})
      }

      <Card style={{width: 300, margin: 20, borderRadius: 7, boxShadow: '0px 0px 5px 1px rgba(208, 216, 243, 0.5)'}}>
        <AddCard/>
      </Card>

    </div>
  )
})

export default App;
