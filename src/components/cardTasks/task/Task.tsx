import {Button, Checkbox, Dropdown, Menu} from 'antd'
import React, {useCallback, useState} from 'react'
import {DEV_VERSION} from '../../../config'
import {EditableTask} from './editableSpan/EditableTask'
import {DeleteOutlined, EditOutlined, EllipsisOutlined, CheckOutlined} from '@ant-design/icons'
import s from './Task.module.css'

export type TaskPropsType = {
  id: string
  title: string
  isDone: boolean
  changeTaskTitle: (taskId: string, title: string) => void
  markTask: (taskId: string) => void
  removeTask: (taskId: string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo((
  {
    id,
    title,
    isDone,
    changeTaskTitle,
    markTask,
    removeTask
  }
) => {
  DEV_VERSION && console.log('Task ', title)

  const [editMode, setEditMode] = useState<boolean>(false)

  const setEditModeHandler = useCallback((value: boolean) => {
    setEditMode(value)
  },[])

  const onChangeTaskTitle = useCallback((newTitle: string) => {
    changeTaskTitle(id, newTitle)
  },[])

  const onMarkTaskHandler = useCallback(() => {
    markTask(id)
  },[])

  const onClickRemoveDropdown = useCallback(() => {
    removeTask(id)
  },[])


  const menu = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1" icon={<CheckOutlined/>} onClick={onMarkTaskHandler}>
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
        <Checkbox checked={isDone} onClick={onMarkTaskHandler} style={{marginLeft: 10, marginRight: 10}}/>
        <EditableTask value={title}
                      changeValue={onChangeTaskTitle}
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