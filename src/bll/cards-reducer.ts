import { Dispatch } from 'react'
import {v1} from 'uuid'
import { AppStateType } from './store'
import {ThunkAction} from 'redux-thunk'
import { cardsAPI } from '../dal/cards-api'


export enum ACTIONS_CARDS_TYPE {
  ADD_CARD = 'Cards/ADD_CARD',
  REMOVE_CARD = 'Cards/REMOVE_CARD',
  CHANGE_CARD_TITLE = 'Card/CHANGE_CARD_TITLE',
  CHANGE_CARD_FILTER = 'Card/CHANGE_CARD_FILTER',
  SET_CARDS = 'Card/SET_CARDS',
}

export type CardFilterType = 'ALL' | 'ACTIVE' | 'DONE'
export type CardType = {
  id: string
  title: string
  filter: string
}
const initialState: Array<CardType> = []

export const cardsReducer = (state: Array<CardType> = initialState, action: CardsACType): Array<CardType> => {
  switch (action.type){
    case ACTIONS_CARDS_TYPE.ADD_CARD:
      return [...state, {id: action.cardId, title: action.cardTitle, filter: 'ALL'}]
    case ACTIONS_CARDS_TYPE.CHANGE_CARD_TITLE: {
      const card = state.find(card => card.id === action.cardId)
      if (card) {
        card.title = action.cardTitle
      }
      return [...state]
    }
    case ACTIONS_CARDS_TYPE.REMOVE_CARD:
      return state.filter(card => card.id !== action.cardId)
    case ACTIONS_CARDS_TYPE.CHANGE_CARD_FILTER: {
      const card = state.find(card => card.id === action.cardId)
      if (card) {
        card.filter = action.filter
      }
      return [...state]
    }
    case ACTIONS_CARDS_TYPE.SET_CARDS:
      return action.cards.map(card => ({...card, filter: 'ALL'}))
    default:
      return state
  }
}

// actions
export const addCardAC = (cardTitle: string) => ({
  type: ACTIONS_CARDS_TYPE.ADD_CARD,
  cardTitle,
  cardId: v1(),
} as const)
export const changeCardTitleAC = (cardId: string, cardTitle: string) => ({
  type: ACTIONS_CARDS_TYPE.CHANGE_CARD_TITLE,
  cardId,
  cardTitle,
} as const)
export const removeCardAC = (cardId: string) => ({
  type: ACTIONS_CARDS_TYPE.REMOVE_CARD,
  cardId,
} as const)
export const changeCardFilterAC = (filter: CardFilterType, cardId: string) => ({
  type: ACTIONS_CARDS_TYPE.CHANGE_CARD_FILTER,
  cardId,
  filter,
} as const)
export const setCardsAC = (cards: Array<CardType>) => ({
  type: ACTIONS_CARDS_TYPE.SET_CARDS,
  cards
} as const)

// types
export type AddCardACType = ReturnType<typeof addCardAC>
export type ChangeCardTitleACType = ReturnType<typeof changeCardTitleAC>
export type RemoveCardACType = ReturnType<typeof removeCardAC>
export type ChangeCardFilterACType = ReturnType<typeof changeCardFilterAC>
export type SetCardsACType = ReturnType<typeof setCardsAC>
export type CardsACType = AddCardACType
  | ChangeCardTitleACType  | RemoveCardACType
  | ChangeCardFilterACType | SetCardsACType
export type CardThunkType = ThunkAction<void, AppStateType, Dispatch<CardsACType>, CardsACType>


// thunks
export const getCardsTC = (): CardThunkType => {
  return (dispatch, getState) => {
    cardsAPI.getCards()
      .then(res => {
        console.log('getCards() - res Obj', res)
        dispatch(setCardsAC(res))
      })
      .catch(e => {
        console.log('getCards() - error Obj: ', e)
      })
  }
}

// export const addCardTC = (title: string): CardThunkType => {
//   return (dispatch, getState) => {
//     cardsAPI.createCard(title)
//       .then(res => {
//         console.log('getCards() - res Obj', res)
//         dispatch(addCardAC())
//       })
//       .catch(e => {
//         console.log('getCards() - error Obj: ', e)
//       })
//   }
// }


