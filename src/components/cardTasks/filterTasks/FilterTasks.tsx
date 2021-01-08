import React from 'react'
import {DEV_VERSION} from '../../../config'
import {Button} from 'antd'
import s from './FilterTasks.module.css'
import {FilterValueType} from '../../../App';

export type FilterTasksPropsType = {
  changeFilter: (value: FilterValueType) => void
}
export const FilterTasks: React.FC<FilterTasksPropsType> = React.memo((
  {
    changeFilter
  }
) => {
  DEV_VERSION && console.log('Filter tasks')

  return (
    <div className={s.filterBtnWrapper}>
        <Button onClick={() => changeFilter('ALL')}>All</Button>
        <Button onClick={() => changeFilter('ACTIVE')}>Active</Button>
        <Button onClick={() => changeFilter('DONE')}>Done</Button>
    </div>
  )
})