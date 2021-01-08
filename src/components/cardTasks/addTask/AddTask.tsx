import React from 'react'
import {DEV_VERSION} from '../../../config'
import {Button} from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import s from './AddTask.module.css'


export const AddTask = React.memo(() => {
  DEV_VERSION && console.log('Add task')

  return (
    <div >
      <Button type="text" icon={<PlusCircleOutlined />} block>Add task</Button>
    </div>
  )
})