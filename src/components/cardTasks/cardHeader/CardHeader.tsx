import {DEV_VERSION} from '../../../config'
import React, {useCallback, useState} from 'react'
import {Badge, Button, Dropdown, Menu} from 'antd'
import s from './CardHeader.module.css'
import { EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons'
import './imp-ant-badge.css'
import {EditableItem} from '../../common/editableItem/EditableItem'

export type CardHeaderPropsType = {
  cardTitle: string
  taskCount: number
  removeCard: () => void
  changeCardTitle: (newCardTitle: string) => void
}
export const CardHeader: React.FC<CardHeaderPropsType> = React.memo((
  {
    cardTitle,
    taskCount,
    removeCard,
    changeCardTitle,
  }
) => {
  DEV_VERSION && console.log('CardHeader ', cardTitle)

  const [editMode, setEditMode] = useState<boolean>(false)

  const setEditModeHandler = useCallback((value: boolean) => {
    setEditMode(value)
  },[])

  const onClickRemoveDropdown = useCallback(() => {
    removeCard()
  },[removeCard])

  const menu = (
    <Menu onClick={() => {
    }}>
      <Menu.Item key="2" icon={<EditOutlined/>} onClick={() => setEditMode(true)}>
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
          <EditableItem
            type={'card'}
            value={cardTitle}
            changeValue={changeCardTitle}
            editMode={editMode}
            setEditMode={setEditModeHandler}
          />
        </Badge>

      <Dropdown overlay={menu} trigger={['click']}>
        <Button icon={<EllipsisOutlined rotate={90}/>} type={'text'} shape={'circle'}/>
      </Dropdown>

   </div>
  )
})