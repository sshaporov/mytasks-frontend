import React from 'react';
import {DEV_VERSION} from '../../../../config';

export const AddTask = React.memo(() => {
  DEV_VERSION && console.log('Add task')

  return (
    <div>Add TASK</div>
  )
})