import {instance} from './instance'

export const tasksAPI = {
  getTasks(cardId: string) {
    return instance.get<GetTasksResponseType>(`/cards/${cardId}/tasks`,
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      .then(res => res.data)
  },
  createTask(cardTitle: string, cardId: string) {
    return instance.post<CreateTaskResponseType>(`/cards/${cardId}/tasks`,{title: cardTitle},
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      .then(res => res.data)
  },
  changeTaskStatus(taskId: string, taskIsChecked: boolean, cardId: string) {
    return instance.put<ChangeTaskResponseType>(`/cards/${cardId}/tasks/${taskId}`,{checked: taskIsChecked},
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      .then(res => res.data)
  },
  changeTaskTitle(taskId: string, taskTitle: string, cardId: string) {
    return instance.put<ChangeTaskResponseType>(`/cards/${cardId}/tasks/${taskId}`, {title: taskTitle},
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      .then(res => res.data)
  },
  removeTask(taskId: string, cardId: string) {
    return instance.delete<ChangeTaskResponseType>(`/cards/${cardId}/tasks/${taskId}`,
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      .then(res => res.data)
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
export type ChangeTaskResponseType = { item: TaskType }
