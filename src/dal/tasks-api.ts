import {instance} from './instance'

export const tasksAPI = {
  createTask(cardId: string, cardTitle: string) {
    return instance.post(`/cards/tasks`, {cardId, title: cardTitle}).then(res => res.data)
  },
}