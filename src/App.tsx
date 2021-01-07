import React, {useState} from 'react'
import './App.css'
import {DEV_VERSION} from './config'
import {v1} from 'uuid';
import { CardTasks } from './components/cardTasks/CardTasks'

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
}

function App() {
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

  return <CardTasks tasks={tasks} cardTitle={'Travel Tasks'}/>
}

export default App;
