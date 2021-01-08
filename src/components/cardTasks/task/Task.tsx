import {Button, Checkbox, Dropdown, Menu, Space} from 'antd'
import React from 'react'
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

  const onChangeTaskTitle = (text: string) => {
    changeTaskTitle(task.id, text)
  }
  const onMarkTask = () => {
    markTask(task.id)
  }
  const onRemoveTask = () => {
    removeTask(task.id)
  }
  const menu = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1" icon={<CheckOutlined />} onClick={onMarkTask}>
        Marked
      </Menu.Item>
      <Menu.Item key="2" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="3" danger icon={<DeleteOutlined/>} onClick={onRemoveTask}>
        Remove
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={s.cardWrapper}>

      <Space>

        <div className={s.checkboxWrapper}>
          <Checkbox checked={task.isDone} onClick={onMarkTask}/>
        </div>

        <div className={s.editableSpanWrapper}>
          <EditableTask value={task.title} changeValue={onChangeTaskTitle}/>
        </div>

        <div className={s.dropdownWrapper}>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button icon={<EllipsisOutlined/>} type={'text'} shape={'circle'}/>
          </Dropdown>
        </div>

      </Space>

    </div>
  )
})