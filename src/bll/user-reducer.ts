import {UserType} from '../dal/auth-api'
import {ACTIONS_AUTH_TYPE} from './auth-reducer'
import {AppReducersType} from './store'

export enum ACTIONS_USER_TYPE {
  SET_USER = 'User/SET_USER',
}

export type UserStateType = {
  _id: string | null
  name: string | null
  email: string
}
const initialState: UserStateType = {
  _id: null,
  name: null,
  email: ''
}

export const userReducer = (state: UserStateType = initialState, action: AppReducersType): UserStateType => {
  switch (action.type) {

    case ACTIONS_USER_TYPE.SET_USER:
      return {...state, ...action.payload}

    case ACTIONS_AUTH_TYPE.LOGOUT:
      return {...state, _id: null, email: '', name: null}

    default:
      return state
  }
}

// actions
export const setUserAC = (user: UserType) =>
  ({type: ACTIONS_USER_TYPE.SET_USER, payload: user} as const)

// types
export type SetUserACType = ReturnType<typeof setUserAC>
export type UserACType = SetUserACType

