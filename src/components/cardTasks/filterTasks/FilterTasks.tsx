import React from 'react'
import {DEV_VERSION} from '../../../config'
import {Button} from 'antd'
import s from './FilterTasks.module.css'

export const FilterTasks = React.memo(() => {
  DEV_VERSION && console.log('Filter tasks')

  return (
    <div className={s.filterBtnWrapper}>
        <Button>All</Button>
        <Button>Active</Button>
        <Button>Done</Button>
    </div>
  )
})