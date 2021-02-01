import {AppReducersType} from './store'
import {ACTIONS_AUTH_TYPE} from './auth-reducer'

export enum ACTIONS_SEARCH_TYPE {
  SET_SEARCH_CARD_TITLE = 'Search/SET_SEARCH_CARD_TITLE',
}

export type SearchStateType = {
  searchCardTitle: string | undefined
}
const initialState: SearchStateType = {
  searchCardTitle: undefined
}

export const searchReducer = (state: SearchStateType = initialState, action: AppReducersType): SearchStateType => {
  switch (action.type) {

    case ACTIONS_SEARCH_TYPE.SET_SEARCH_CARD_TITLE:
      return {...state, searchCardTitle: action.searchCardTitle}

    case ACTIONS_AUTH_TYPE.LOGOUT:
      return {...state, searchCardTitle: undefined}

    default:
      return state
  }
}

// actions
export const setSearchCardTitleAC = (searchCardTitle: string | undefined) => ({
  type: ACTIONS_SEARCH_TYPE.SET_SEARCH_CARD_TITLE,
  searchCardTitle
} as const)

// types
export type SetSearchCardTitleACType = ReturnType<typeof setSearchCardTitleAC>
export type SearchACType = SetSearchCardTitleACType