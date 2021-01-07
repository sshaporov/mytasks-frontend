import React from 'react'
import { Progress } from 'antd';
import {DEV_VERSION} from '../../../config';

export type CardProgressBarPropsType = {
  progress: number
  taskCount: number
}
export const CardProgressBar: React.FC<CardProgressBarPropsType> = React.memo((
  {
    progress,
    taskCount
  }
) => {
  DEV_VERSION && console.log('CardProgressBar')

  return (
    <div>
      <Progress percent={progress} />
      <Progress type="circle" percent={progress} width={50}/>
      <div></div>
      <Progress percent={progress} steps={taskCount} />
    </div>
  )
})