import {UserType} from '../dal/auth-api'
import {ACTIONS_AUTH_TYPE, AuthACType} from './auth-reducer';

export enum ACTIONS_USER_TYPE {
  SET_USER = 'User/SET_USER',
}

export type UserStateType = {
  _id?: string
  name?: string
  email?: string
}
const initialState: UserStateType = {}

export const userReducer = (state: UserStateType = initialState, action: UserACType | AuthACType): UserStateType => {
  switch (action.type) {

    case ACTIONS_USER_TYPE.SET_USER:
      return {...state, ...action.payload}

    case ACTIONS_AUTH_TYPE.LOGOUT:
      return {}

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

