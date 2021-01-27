import {Dispatch} from 'react'
import {AppStateType} from './store'
import {ThunkAction} from 'redux-thunk'
import {cardsAPI, CardType} from '../dal/cards-api'
import {ACTIONS_AUTH_TYPE, AuthACType} from './auth-reducer';

export enum ACTIONS_CARDS_TYPE {
  ADD_CARD = 'Cards/ADD_CARD',
  REMOVE_CARD = 'Cards/REMOVE_CARD',
  CHANGE_CARD_TITLE = 'Card/CHANGE_CARD_TITLE',
  CHANGE_CARD_FILTER = 'Card/CHANGE_CARD_FILTER',
  SET_CARDS = 'Card/SET_CARDS',
}

export type CardFilterValuesType = 'ALL' | 'ACTIVE' | 'DONE'
export type CardStateType = CardType & { filter: CardFilterValuesType }
const initialState: Array<CardStateType> = []

export const cardsReducer = (state: Array<CardStateType> = initialState, action: CardsACType | AuthACType): Array<CardStateType> => {
  switch (action.type) {

    case ACTIONS_CARDS_TYPE.SET_CARDS:
      return action.cards.map(card => ({...card, filter: 'ALL'}))

    case ACTIONS_CARDS_TYPE.ADD_CARD:
      return [...state, {...action.card, filter: 'ALL'}]

    case ACTIONS_CARDS_TYPE.CHANGE_CARD_TITLE:
      return state.map(card => card._id === action.cardId ? {...card, title: action.cardTitle} : card)

    case ACTIONS_CARDS_TYPE.REMOVE_CARD:
      return state.filter(card => card._id !== action.cardId)

    case ACTIONS_CARDS_TYPE.CHANGE_CARD_FILTER: {
      const card = state.find(card => card._id === action.cardId)
      if (card) {
        card.filter = action.filter
      }
      return [...state]
    }

    case ACTIONS_AUTH_TYPE.LOGOUT:
      return []

    default:
      return state
  }
}

// actions
export const addCardAC = (card: CardType) => ({
  type: ACTIONS_CARDS_TYPE.ADD_CARD,
  card
} as const)
export const setCardsAC = (cards: Array<CardType>) => ({
  type: ACTIONS_CARDS_TYPE.SET_CARDS,
  cards
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
export const changeCardFilterAC = (filter: CardFilterValuesType, cardId: string) => ({
  type: ACTIONS_CARDS_TYPE.CHANGE_CARD_FILTER,
  cardId,
  filter,
} as const)

// types
export type AddCardACType = ReturnType<typeof addCardAC>
export type SetCardsACType = ReturnType<typeof setCardsAC>
export type ChangeCardTitleACType = ReturnType<typeof changeCardTitleAC>
export type RemoveCardACType = ReturnType<typeof removeCardAC>
export type ChangeCardFilterACType = ReturnType<typeof changeCardFilterAC>
export type CardsACType = AddCardACType | SetCardsACType | ChangeCardTitleACType | RemoveCardACType | ChangeCardFilterACType
export type CardsThunkType = ThunkAction<void, AppStateType, Dispatch<CardsACType>, CardsACType>

// thunks
export const getCardsTC = (): CardsThunkType => {
  return (dispatch) => {
    cardsAPI.getCards()
      .then(res => {
        dispatch(setCardsAC(res))
      })
      .catch(e => {
        console.log('error - getCardsTC ', e)
      })
  }
}
export const addCardTC = (cardTitle: string): CardsThunkType => {
  return (dispatch) => {
    cardsAPI.createCard(cardTitle)
      .then(res => {
        dispatch(addCardAC(res.item))
      })
      .catch(e => {
        console.log('error - addCardsTC ', e)
      })
  }
}
export const changeCardTitleTC = (cardId: string, newCardTitle: string): CardsThunkType => {
  return (dispatch) => {
    cardsAPI.changeCardTitle(cardId, newCardTitle)
      .then(res => {
        dispatch(changeCardTitleAC(cardId, newCardTitle))
      })
      .catch(e => {
        console.log('error - changeCardTitleTC ', e)
      })
  }
}
export const removeCardTC = (cardId: string): CardsThunkType => {
  return (dispatch) => {
    cardsAPI.removeCard(cardId)
      .then(res => {
        dispatch(removeCardAC(cardId))
      })
      .catch(e => {
        console.log('error removeCardTC ', e)
      })
  }
}