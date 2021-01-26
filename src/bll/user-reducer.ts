import {UserType} from '../dal/auth-api';

export enum ACTIONS_USER_TYPE {
  SET_USER = 'User/SET_USER',
}

export type UserStateType = {
  _id: string
  name?: string
  email: string
}
const initialState: UserStateType = {
  _id: '',
  email: '',
}

export const userReducer = (state: UserStateType = initialState, action: UserACType): UserStateType => {
  switch (action.type) {

    case ACTIONS_USER_TYPE.SET_USER:
      return {...state, ...action.payload}

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
