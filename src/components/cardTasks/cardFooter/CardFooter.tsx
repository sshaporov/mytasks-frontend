import {DEV_VERSION} from '../../../config'
import React from 'react'
import {AddTask} from './addTask/AddTask';
import {FilterTasks} from './filterTasks/FilterTasks';

export const CardFooter = React.memo(() => {
  DEV_VERSION && console.log('CardFooter')

  return (
   <div>
     <AddTask/>
     <FilterTasks/>
   </div>
  )
})