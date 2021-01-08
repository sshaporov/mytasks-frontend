import {Button, Checkbox, Dropdown, Menu} from 'antd'
import React from 'react'
import {TaskType} from '../../../App'
import {DEV_VERSION} from '../../../config'
import {EditableSpan} from '../../editableSpan/EditableSpan'
import {DeleteOutlined, EditOutlined, EllipsisOutlined, InboxOutlined, CheckOutlined} from '@ant-design/icons';

export type TaskPropsType = {
  task: TaskType
  changeTaskTitle: (id: string, title: string) => void
  markTask: (id: string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo((
  {
    task,
    changeTaskTitle,
    markTask
  }
) => {
  DEV_VERSION && console.log('Task ', task.title)

  const onChangeTaskTitle = (text: string) => {
    changeTaskTitle(task.id, text)
  }
  const onMarkTask = () => {
    markTask(task.id)
  }
  const menu = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1" icon={<CheckOutlined />}>
        Marked
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
      <Checkbox checked={task.isDone} onClick={onMarkTask}/>
      <EditableSpan value={task.title} changeValue={onChangeTaskTitle}/>

      <Dropdown overlay={menu} trigger={['click']}>
        <Button icon={<EllipsisOutlined />} type={'text'} shape={'circle'}/>
      </Dropdown>

    </div>
  )
})