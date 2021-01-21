import {instance} from './instance'

export const tasksAPI = {
  getTasks(cardId: string) {
    return instance.get<GetTasksResponseType>(`/cards/${cardId}/tasks`).then(res => res.data)
  },
  createTask(cardTitle: string, cardId: string) {
    return instance.post<CreateTaskResponseType>(`/cards/${cardId}/tasks`, {title: cardTitle}).then(res => res.data)
  },
  changeTaskStatus(taskId: string, taskStatus: boolean, cardId: string) {
    return instance.put<ChangeTaskStatusResponseType>(`/cards/${cardId}/tasks/${taskId}`, {status: taskStatus}).then(res => res.data)
  },
}

// types
export type TaskType = {
  _id: string
  card_id: string
  checked: boolean
  title: string
}
export type GetTasksResponseType = Array<TaskType>
export type CreateTaskResponseType = { item: TaskType }
export type ChangeTaskStatusResponseType = { item: TaskType }
