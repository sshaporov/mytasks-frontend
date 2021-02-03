import {DEV_VERSION} from '../../../config'
import React, {useCallback, useState} from 'react'
import {Badge, Button, Dropdown, Menu} from 'antd'
import { EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons'
import {EditableItem} from '../../common/editableItem/EditableItem'
import './cardHeader.css'

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

  const onClickEditDropdown = useCallback(() => {
    setEditMode(true)
  }, [editMode])

  const menu = (
    <Menu>
      <Menu.Item key='1' icon={<EditOutlined/>} onClick={onClickEditDropdown}>
        Edit
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key='2' danger icon={<DeleteOutlined />} onClick={onClickRemoveDropdown}>
        Remove
      </Menu.Item>
    </Menu>
  )

  return (
    <div className='wrapper-cardHeader'>
        <Badge count={taskCount} offset={[7, -7]} className='badge-card'>
          <EditableItem
            type='card'
            value={cardTitle}
            changeValue={changeCardTitle}
            editMode={editMode}
            setEditMode={setEditModeHandler}
          />
        </Badge>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button icon={<EllipsisOutlined rotate={90}/>} type='text' shape='circle'/>
      </Dropdown>
   </div>
  )
})