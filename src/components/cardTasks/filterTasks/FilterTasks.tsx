import React, {useCallback} from 'react'
import {DEV_VERSION} from '../../../config'
import {Button} from 'antd'
import s from './FilterTasks.module.css'
import {CardFilterType} from '../../../bll/cards-reducer'

export type FilterTasksPropsType = {
  changeFilter: (value: CardFilterType) => void
}
export const FilterTasks: React.FC<FilterTasksPropsType> = React.memo((
  {
    changeFilter,
  }
) => {
  DEV_VERSION && console.log('Filter tasks')

  const onAllBtnClickHandler = useCallback(() => changeFilter('ALL'), [changeFilter])
  const onActiveBtnClickHandler = useCallback(() => changeFilter('ACTIVE'), [changeFilter])
  const onDoneBtnClickHandler = useCallback(() => changeFilter('DONE'),[changeFilter])

  // добавление стиля для растягивания кнопок по ширине (тк родительский div - flex)
  const styles = {flex: 1}

  return (
    <div className={s.filterBtnWrapper}>
        <Button onClick={onAllBtnClickHandler} style={styles}>All</Button>
        <Button onClick={onActiveBtnClickHandler} style={styles}>Active</Button>
        <Button onClick={onDoneBtnClickHandler} style={styles}>Done</Button>
    </div>
  )
})