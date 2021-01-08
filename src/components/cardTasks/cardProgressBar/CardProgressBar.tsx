import React from 'react'
import { Progress } from 'antd';
import {DEV_VERSION} from '../../../config';

export type CardProgressBarPropsType = {
  progress: number
}
export const CardProgressBar: React.FC<CardProgressBarPropsType> = React.memo((
  {
    progress,
  }
) => {
  DEV_VERSION && console.log('CardProgressBar')

  return <Progress percent={progress} showInfo/>
})