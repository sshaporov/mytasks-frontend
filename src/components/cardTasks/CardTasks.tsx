import React from 'react';
import {Card} from 'antd';
import {TaskType} from '../../App';
import {Task} from '../task/Task';

export type CardTasksPropsType = {
  cardTitle: string
  tasks: Array<TaskType>
  changeTaskTitle: (id: string, title: string) => void
  markTask: (id: string) => void
}
export const CardTasks: React.FC<CardTasksPropsType> = React.memo((
  {
    cardTitle,
    tasks,
    changeTaskTitle,
    markTask,
  }
) => {
  return (
    <div>
      <Card title={cardTitle} bordered={true} style={{width: 300}}>

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