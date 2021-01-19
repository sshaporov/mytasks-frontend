import {instance} from './instance'

export const cardsAPI = {
  getCards() {
    return instance.get(`/cards`).then(res => res.data)
  },
  createCard(cardTitle: string) {
    return instance.post(`/cards`, {title: cardTitle}).then(res => res.data)
  },
  removeCard(cardId: string) {
    return instance.delete(`/cards/${cardId}`).then(res => res.data)
  },
  changeCardTitle(cardId: string, newCardTitle: string) {
    return instance.put(`/cards/${cardId}`, {title: newCardTitle}).then(res => res.data)
  },
}