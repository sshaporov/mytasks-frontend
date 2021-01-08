import React from 'react'
import {DEV_VERSION} from '../../../../config'
import {Button} from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'


export const AddTask = React.memo(() => {
  DEV_VERSION && console.log('Add task')

  return (
      <Button type="text" icon={<PlusCircleOutlined />}>
        Add task
      </Button>
  )
})