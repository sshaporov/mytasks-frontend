import {instance} from './instance'

export const tasksAPI = {
  createTask(cardTitle: string, cardId: string) {
    return instance.post(`/cards/${cardId}/tasks`, { title: cardTitle }).then(res => res.data)
  },
  getTasks(cardId: string) {
    return instance.get(`/cards/${cardId}/tasks`).then(res => res.data)
  },
}