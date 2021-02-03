import React, {useCallback} from 'react'
import {DEV_VERSION} from '../../../config'
import {Button} from 'antd'
import { CardFilterValuesType } from '../../../bll/cards-reducer'
import './filterTasks.css'

export type FilterTasksPropsType = {
  changeFilter: (value: CardFilterValuesType) => void
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

  // additional style for filter buttons
  const styles = {flex: 1}

  return (
    <div className='wrapper-filterBtn'>
        <Button onClick={onAllBtnClickHandler} style={styles}>All</Button>
        <Button onClick={onActiveBtnClickHandler} style={styles}>Active</Button>
        <Button onClick={onDoneBtnClickHandler} style={styles}>Done</Button>
    </div>
  )
})