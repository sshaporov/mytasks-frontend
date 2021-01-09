import {Button, Checkbox, Dropdown, Menu} from 'antd'
import React, {useCallback, useState} from 'react'
import {TaskType} from '../../../App'
import {DEV_VERSION} from '../../../config'
import {EditableTask} from './editableSpan/EditableTask'
import {DeleteOutlined, EditOutlined, EllipsisOutlined, CheckOutlined} from '@ant-design/icons'
import s from './Task.module.css'

export type TaskPropsType = {
  task: TaskType
  changeTaskTitle: (id: string, title: string) => void
  markTask: (id: string) => void
  removeTask: (id: string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo((
  {
    task,
    changeTaskTitle,
    markTask,
    removeTask
  }
) => {
  DEV_VERSION && console.log('Task ', task.title)

  const [editMode, setEditMode] = useState<boolean>(false)

  const setEditModeHandler = useCallback((value: boolean) => {
    setEditMode(value)
  },[])

  const onChangeTaskTitle = useCallback((text: string) => {
    changeTaskTitle(task.id, text)
  },[])

  const onMarkTask = useCallback(() => {
    markTask(task.id)
  },[])

  const onRemoveTask = useCallback(() => {
    removeTask(task.id)
  },[])


  const menu = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1" icon={<CheckOutlined/>} onClick={onMarkTask}>
        Marked
      </Menu.Item>
      <Menu.Item key="2" icon={<EditOutlined/>} onClick={() => setEditMode(true)}>
        Edit
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="3" danger icon={<DeleteOutlined/>} onClick={onRemoveTask}>
        Remove
      </Menu.Item>
    </Menu>
  )

  return (
    // обрачиваем в div чтобы на флексах выровнять чекбокс, спан и меню
    <div className={s.cardWrapper}>

      <div>
        <Checkbox checked={task.isDone} onClick={onMarkTask} style={{marginLeft: 10, marginRight: 10}}/>
        <EditableTask value={task.title}
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