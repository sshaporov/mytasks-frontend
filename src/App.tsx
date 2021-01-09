import React, {useCallback, useEffect, useMemo, useState} from 'react'
import './App.css'
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

  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: 'FrontEnd', isDone: true},
    {id: v1(), title: 'BackEnd', isDone: false},
    {id: v1(), title: 'Mobile', isDone: true},
    {id: v1(), title: 'DB', isDone: false},
    {id: v1(), title: 'Rest', isDone: true},
    {id: v1(), title: 'WebSocket', isDone: false},
    {id: v1(), title: 'Unit', isDone: true},
  ])
  const [cards, setCards] = useState([
    {id: v1(), title: 'Learn list', filter: 'ALL'},
    {id: v1(), title: 'Travel list', filter: 'ALL'},
  ])

  const changeTaskTitle = useCallback((id: string, title: string) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      task.title = title
      setTasks([...tasks])
    }
  }, [tasks])

  const markTask = useCallback((id: string) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      task.isDone = !task.isDone
      setTasks([...tasks])
    }
  },[tasks])

  const removeTask = useCallback((id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }, [tasks])

  const addTask = useCallback((title: string) => {
    const task: TaskType = {id: v1(), title, isDone: false}
    const newArr = [...tasks]
    newArr.push(task)
    setTasks(newArr)
  }, [tasks])

  // const changeFilter = useCallback((value: FilterValueType) => {
  //   setFilterValue(value)
  // }, [tasks])
  //
  // // filter display logic
  // let tasksForFilterDisplaying = tasks
  // if (filterValue === 'DONE') tasksForFilterDisplaying = tasks.filter(t => t.isDone)
  // if (filterValue === 'ACTIVE') tasksForFilterDisplaying = tasks.filter(t => !t.isDone)

  const changeFilter = (value: FilterValueType, cardId: string) => {
    const card = cards.find(c => c.id === cardId)
    if (card) {
      card.filter = value
      setCards([...cards])
    }
  }




  return (
    <div className='app-body'>
      {cards.map(c => {

        // filter display logic
        let tasksForFilterDisplaying = tasks
        if (c.filter === 'DONE') tasksForFilterDisplaying = tasks.filter(t => t.isDone)
        if (c.filter === 'ACTIVE') tasksForFilterDisplaying = tasks.filter(t => !t.isDone)

        return <CardTasks
                cardId={c.id}
                tasks={tasksForFilterDisplaying}
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
