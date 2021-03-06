import {Button, Checkbox, Dropdown, Menu} from 'antd'
import React, {CSSProperties, useCallback, useState} from 'react'
import {DEV_VERSION} from '../../../config'
import {EditableItem} from '../../common/editableItem/EditableItem'
import {DeleteOutlined, EditOutlined, EllipsisOutlined, CheckOutlined} from '@ant-design/icons'
import s from './Task.module.css'

export type TaskPropsType = {
  id: string
  title: string
  isChecked: boolean
  changeTaskTitle: (taskId: string, title: string) => void
  changeTaskStatus: (taskId: string, taskStatus: boolean) => void
  removeTask: (taskId: string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo((
  {
    id,
    title,
    isChecked,
    changeTaskTitle,
    changeTaskStatus,
    removeTask
  }
) => {
  DEV_VERSION && console.log('Task ', title)

  const checkboxAlignStyles: CSSProperties = {
    marginLeft: 10,
    marginRight: 10
  }

  const [editMode, setEditMode] = useState<boolean>(false)

  const setEditModeHandler = useCallback((value: boolean) => {
    setEditMode(value)
  },[])

  const onChangeTaskTitleHandler = useCallback((newTitle: string) => {
    changeTaskTitle(id, newTitle)
  },[changeTaskTitle, id])

  const changeTaskStatusHandler = useCallback(() => {
    changeTaskStatus(id, !isChecked)
  },[changeTaskStatus, id, isChecked])

  const onClickRemoveDropdown = useCallback(() => {
    removeTask(id)
  },[removeTask, id])

  const menu = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1" icon={<CheckOutlined/>} onClick={changeTaskStatusHandler}>
        Marked
      </Menu.Item>
      <Menu.Item key="2" icon={<EditOutlined/>} onClick={() => setEditMode(true)}>
        Edit
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="3" danger icon={<DeleteOutlined/>} onClick={onClickRemoveDropdown}>
        Remove
      </Menu.Item>
    </Menu>
  )

  return (
    // обрачиваем в div чтобы на флексах выровнять чекбокс, спан и меню
    <div className={s.cardWrapper}>
      <div>
        <Checkbox checked={isChecked} onChange={changeTaskStatusHandler} style={checkboxAlignStyles}/>
        <EditableItem
          value={title}
          type={'task'}
          changeValue={onChangeTaskTitleHandler}
          editMode={editMode}
          setEditMode={setEditModeHandler}
        />
      </div>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button icon={<EllipsisOutlined/>} type={'text'}/>
      </Dropdown>

    </div>
  )
})