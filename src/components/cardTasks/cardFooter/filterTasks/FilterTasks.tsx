import React from 'react'
import {DEV_VERSION} from '../../../../config'
import {Button} from 'antd'

export const FilterTasks = React.memo(() => {
  DEV_VERSION && console.log('Filter tasks')

  return (
    <div>
      <Button>All</Button>
      <Button>Active</Button>
      <Button>Done</Button>
    </div>
  )
})