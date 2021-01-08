import {DEV_VERSION} from '../../../config'
import React from 'react'
import { Badge, Button, Dropdown, Menu } from 'antd'
import s from './CardHeader.module.css'
import { PlusOutlined, EditOutlined, InboxOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons'
import './imp-ant-badge.css'

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

  const menu = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1" icon={<PlusOutlined />}>
        Add
      </Menu.Item>
      <Menu.Item key="2" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Item key="3" icon={<InboxOutlined />}>
        Archive
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="4" danger icon={<DeleteOutlined />}>
        Remove
      </Menu.Item>
    </Menu>
  )

  return (
   <div>

     <Badge count={taskCount} offset={[7, -7]} className="badge-card-count">
       <div className={s.cardText}>{cardName}</div>
     </Badge>

     <Dropdown overlay={menu} trigger={['click']}>
       <Button icon={<EllipsisOutlined rotate={90}/>} type={'text'} shape={'circle'}/>
     </Dropdown>

   </div>
  )
})