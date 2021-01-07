import { Card } from 'antd';
import {TaskType} from '../../App';
import {Task} from '../task/Task';

export type CardTasksPropsType = {
  cardTitle: string
  tasks: Array<TaskType>
}
export const CardTasks: React.FC<CardTasksPropsType> = (
  {
    cardTitle,
    tasks,
  }
) => {
  return (
    <div>
      <Card title={cardTitle} bordered={false} style={{ width: 300 }}>
        { tasks.map(t => <Task key={t.id} task={t}/>) }
      </Card>
    </div>
  )
}