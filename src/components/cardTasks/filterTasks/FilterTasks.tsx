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

  const onClickFilterBtn = () => {
    changeFilter
  }

  // добавление стиля для растягивания кнопок по ширине (тк родительский div - flex)
  const styles = {flex: 1}

  return (
    <div className={s.filterBtnWrapper}>
        <Button onClick={() => changeFilter('ALL')} style={styles}>All</Button>
        <Button onClick={() => changeFilter('ACTIVE')} style={styles}>Active</Button>
        <Button onClick={() => changeFilter('DONE')} style={styles}>Done</Button>
    </div>
  )
})