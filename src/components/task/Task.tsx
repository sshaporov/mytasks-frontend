import { Checkbox } from 'antd';
import React from 'react';
import {TaskType} from '../../App';

export type TaskPropsType = {
  task: TaskType
}
export const Task: React.FC<TaskPropsType> = (
  {
    task,
  }
) => {
  return (
    <p>
      <Checkbox checked={task.isDone}/>
      {task.title}
    </p>
  )
}