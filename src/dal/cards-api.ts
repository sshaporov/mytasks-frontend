import {instance} from './instance'

export const cardsAPI = {
  getCards(searchCardTitle: string | undefined) {
    return instance.get<GetCardsResponseType>(`/cards`,
      {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        params: {search: searchCardTitle},
      })
      .then(res => res.data)
  },
  createCard(cardTitle: string) {
    return instance.post<CreateCardResponseType>(`/cards`, {title: cardTitle},
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      .then(res => res.data)
  },
  changeCardTitle(cardId: string, newCardTitle: string) {
    return instance.put<ChangeCardResponseType>(`/cards/${cardId}`, { title: newCardTitle },
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      .then(res => res.data)
  },
  removeCard(cardId: string) {
    return instance.delete<RemoveCardResponseType>(`/cards/${cardId}`,
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      .then(res => res.data)
  },
}

// types
export type CardType = { _id: string, title: string }
export type GetCardsResponseType = Array<CardType>
export type CreateCardResponseType = { item: CardType }
export type ChangeCardResponseType = { item: CardType }
export type RemoveCardResponseType = { success: boolean }
