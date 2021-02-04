import React, {useCallback} from 'react'
import {DEV_VERSION} from '../../../config'
import {Button} from 'antd'
import { CardFilterValuesType } from '../../../bll/cards-reducer'
import './filterTasks.css'

export type FilterTasksPropsType = {
  changeFilter: (value: CardFilterValuesType) => void
  filter: CardFilterValuesType
}
export const FilterTasks: React.FC<FilterTasksPropsType> = React.memo((
  {
    changeFilter,
    filter
  }
) => {
  DEV_VERSION && console.log('Filter tasks')

  const onAllBtnClickHandler = useCallback(() => changeFilter('ALL'), [changeFilter])
  const onActiveBtnClickHandler = useCallback(() => changeFilter('ACTIVE'), [changeFilter])
  const onDoneBtnClickHandler = useCallback(() => changeFilter('DONE'),[changeFilter])

  // additional style for filter buttons
  const styles = {flex: 1}

  return (
    <div className='wrapper-filterBtn'>
        <Button onClick={onAllBtnClickHandler} style={filter === 'ALL' ? {flex: 1, backgroundColor: '#eff2f5'} : styles}>All</Button>
        <Button onClick={onActiveBtnClickHandler} style={filter === 'ACTIVE' ? {flex: 1, backgroundColor: '#eff2f5'} : styles}>Active</Button>
        <Button onClick={onDoneBtnClickHandler} style={filter === 'DONE' ? {flex: 1, backgroundColor: '#eff2f5'} : styles}>Done</Button>
    </div>
  )
})