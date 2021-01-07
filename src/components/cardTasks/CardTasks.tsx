import React from 'react'
import {Card} from 'antd'
import {TaskType} from '../../App'
import {Task} from '../task/Task'
import {DEV_VERSION} from '../../config';

export type CardTasksPropsType = {
  cardName: string
  tasks: Array<TaskType>
  changeTaskTitle: (id: string, title: string) => void
  markTask: (id: string) => void
}
export const CardTasks: React.FC<CardTasksPropsType> = React.memo((
  {
    cardName,
    tasks,
    changeTaskTitle,
    markTask,
  }
) => {
  DEV_VERSION && console.log('CardTasks ', cardName)

  return (
    <div>
      <Card title={cardName} bordered={true} style={{width: 300}}>

        {tasks.map(t => <Task
                          key={t.id}
                          task={t}
                          changeTaskTitle={changeTaskTitle}
                          markTask={markTask}
                        />
        )}

      </Card>
    </div>
  )
})