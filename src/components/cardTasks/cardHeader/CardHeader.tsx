import {DEV_VERSION} from '../../../config'
import React from 'react'
import { Badge } from 'antd'
import s from './CardHeader.module.css'

export type CardHeaderPropsType = {
  cardName: string
  taskCount: number
}
export const CardHeader: React.FC<CardHeaderPropsType> = React.memo((
  {
    cardName,
    taskCount
  }
) => {
  DEV_VERSION && console.log('CardHeader')

  return (
   <div>
     <Badge count={taskCount} offset={[7, -7]}>
       <div className={s.cardText}>{cardName}</div>
     </Badge>
   </div>
  )
})