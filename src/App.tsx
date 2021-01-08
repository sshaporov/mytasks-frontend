import React, {useEffect, useState} from 'react'
import './App.css'
import {DEV_VERSION} from './config'
import {v1} from 'uuid'
import { CardTasks } from './components/cardTasks/CardTasks'

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
}
export type FilterValueType = 'ALL' | 'DONE' | 'ACTIVE'

const App = () => {
  DEV_VERSION && console.log('App');

  const [filterValue, setFilterValue] = useState<FilterValueType>('ALL')
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: 'FrontEnd', isDone: true},
    {id: v1(), title: 'BackEnd', isDone: false},
    {id: v1(), title: 'Mobile', isDone: true},
    {id: v1(), title: 'DB', isDone: false},
    {id: v1(), title: 'Rest', isDone: true},
    {id: v1(), title: 'WebSocket', isDone: false},
    {id: v1(), title: 'Unit', isDone: true},
  ])
  const [filterTasks, setFilterTasks] = useState<Array<TaskType>>([...tasks])

  // при изменении tasks массива обновляем массив для фильтрации
  useEffect(() => {
    setFilterTasks([...tasks])
  }, [tasks])

  const changeTaskTitle = (id: string, title: string) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      task.title = title
      setTasks([...tasks])
    }
  }

  const markTask = (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      task.isDone = !task.isDone
      setTasks([...tasks])
    }
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const addTask = (title: string) => {
    const task: TaskType = {id: v1(), title, isDone: false}
    const newArr = [...tasks]
    newArr.push(task)
    setTasks(newArr)
  }

  const changeFilter = (value: FilterValueType) => {
    setFilterValue(value)
  }

  // filter display logic
  let tasksForFilterDisplaying = filterTasks
  if (filterValue === 'DONE') tasksForFilterDisplaying = filterTasks.filter(t => t.isDone)
  if (filterValue === 'ACTIVE') tasksForFilterDisplaying = filterTasks.filter(t => !t.isDone)


  return (
    <div className='app-body'>
      <CardTasks
        tasks={tasks}
        filterTasks={tasksForFilterDisplaying}
        cardName={'Travel Tasks'}
        changeTaskTitle={changeTaskTitle}
        markTask={markTask}
        removeTask={removeTask}
        addTask={addTask}
        changeFilter={changeFilter}
      />
    </div>
  )
}

export default App;
