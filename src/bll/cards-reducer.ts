import {AppReducersType, AppThunksType} from './store'
import {cardsAPI, CardType} from '../dal/cards-api'
import {ACTIONS_AUTH_TYPE} from './auth-reducer'
import {setErrorAC, setStatusAC} from './request-reducer'

export enum ACTIONS_CARDS_TYPE {
  ADD_CARD = 'Cards/ADD_CARD',
  REMOVE_CARD = 'Cards/REMOVE_CARD',
  CHANGE_CARD_TITLE = 'Cards/CHANGE_CARD_TITLE',
  CHANGE_CARD_FILTER = 'Cards/CHANGE_CARD_FILTER',
  SET_CARDS = 'Cards/SET_CARDS',
}

export type CardFilterValuesType = 'ALL' | 'ACTIVE' | 'DONE'
export type CardStateType = CardType & { filter: CardFilterValuesType }
const initialState: Array<CardStateType> = []

export const cardsReducer = (state: Array<CardStateType> = initialState, action: AppReducersType): Array<CardStateType> => {
  switch (action.type) {

    case ACTIONS_CARDS_TYPE.SET_CARDS:
      return action.cards.map(card => ({...card, filter: 'ALL'}))

    case ACTIONS_CARDS_TYPE.ADD_CARD:
      return [...state, {...action.card, filter: 'ALL'}]

    case ACTIONS_CARDS_TYPE.CHANGE_CARD_TITLE:
      return state.map(card => card._id === action.cardId ? {...card, title: action.cardTitle} : card)

    case ACTIONS_CARDS_TYPE.REMOVE_CARD:
      return state.filter(card => card._id !== action.cardId)

    case ACTIONS_CARDS_TYPE.CHANGE_CARD_FILTER:
      return state.map(card => card._id === action.cardId ? {...card, filter: action.filter} : card)

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

// thunks
export const getCardsTC = (): AppThunksType => {
  return (dispatch, getState) => {
    const searchCardTitle = getState().search.searchCardTitle
    dispatch(setStatusAC('loading'))
    cardsAPI.getCards(searchCardTitle)
      .then(res => {
        dispatch(setCardsAC(res))
        dispatch(setStatusAC('succeeded'))
      })
      .catch(err => {
        dispatch(setErrorAC(err.response.data.message))
        dispatch(setStatusAC('failed'))
      })
  }
}
export const addCardTC = (cardTitle: string): AppThunksType => {
  return (dispatch) => {
    dispatch(setStatusAC('loading'))
    cardsAPI.createCard(cardTitle)
      .then(res => {
        dispatch(addCardAC(res.item))
        dispatch(setStatusAC('succeeded'))
      })
      .catch(err => {
        dispatch(setErrorAC(err.message ? err.message : 'Something went wrong'))
        dispatch(setStatusAC('failed'))
      })
  }
}
export const changeCardTitleTC = (cardId: string, newCardTitle: string): AppThunksType => {
  return (dispatch) => {
    dispatch(setStatusAC('loading'))
    cardsAPI.changeCardTitle(cardId, newCardTitle)
      .then(() => {
        dispatch(changeCardTitleAC(cardId, newCardTitle))
        dispatch(setStatusAC('succeeded'))
      })
      .catch(err => {
        dispatch(setErrorAC(err.message ? err.message : 'Something went wrong'))
        dispatch(setStatusAC('failed'))
      })
  }
}
export const removeCardTC = (cardId: string): AppThunksType => {
  return (dispatch) => {
    dispatch(setStatusAC('loading'))
    cardsAPI.removeCard(cardId)
      .then(() => {
        dispatch(removeCardAC(cardId))
        dispatch(setStatusAC('succeeded'))

      })
      .catch(err => {
        dispatch(setErrorAC(err.message ? err.message : 'Something went wrong'))
        dispatch(setStatusAC('failed'))
      })
  }
}