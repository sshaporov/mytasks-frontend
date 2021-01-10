import {DEV_VERSION} from '../../../config'
import React from 'react'
import { Badge, Button, Dropdown, Menu } from 'antd'
import s from './CardHeader.module.css'
import { EditOutlined, CopyOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons'
import './imp-ant-badge.css'

export type CardHeaderPropsType = {
  cardTitle: string
  taskCount: number
  removeCard: () => void
}
export const CardHeader: React.FC<CardHeaderPropsType> = React.memo((
  {
    cardTitle,
    taskCount,
    removeCard,
  }
) => {
  DEV_VERSION && console.log('CardHeader')

  const onClickRemoveDropdown = () => {
    removeCard()
  }

  const menu = (
    <Menu onClick={() => {}}>
      <Menu.Item key="2" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="4" danger icon={<DeleteOutlined />} onClick={onClickRemoveDropdown}>
        Remove
      </Menu.Item>
    </Menu>
  )

  return (
   <div className={s.cardHeaderWrapper}>

     <Badge count={taskCount} offset={[7, -7]} className="badge-card-count">
       <div className={s.cardText}>{cardTitle}</div>
     </Badge>

     <Dropdown overlay={menu} trigger={['click']}>
       <Button icon={<EllipsisOutlined rotate={90}/>} type={'text'} shape={'circle'}/>
     </Dropdown>

   </div>
  )
})