import { Dispatch } from 'redux'
import {ThunkAction} from 'redux-thunk'
import {AppStateType} from './store'
import {authAPI} from '../dal/auth-api'
import {LoginDataType} from '../components/login/LoginForm'
import {setUserAC, UserACType} from './user-reducer';

export enum ACTIONS_AUTH_TYPE {
  SET_IS_LOGGED_IN = 'Auth/SET_IS_LOGGED_IN',
}

export type AuthStateType = {
  isLoggedIn: boolean
}
const initialState: AuthStateType = {
  isLoggedIn: false
}

export const authReducer = (state: AuthStateType = initialState, action: AuthACType): AuthStateType => {
  switch (action.type) {

    case ACTIONS_AUTH_TYPE.SET_IS_LOGGED_IN:
      return {...state, isLoggedIn: action.value}

    default:
      return state
  }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({type: ACTIONS_AUTH_TYPE.SET_IS_LOGGED_IN, value} as const)

// types
export type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export type AuthACType = SetIsLoggedInACType
export type AuthThunkType = ThunkAction<void, AppStateType, Dispatch<AuthACType | UserACType>, AuthACType | UserACType>

// thunks
export const loginTC = (data: LoginDataType): AuthThunkType => {
  return (dispatch) => {
    authAPI.login(data)
      .then(res => {
        dispatch(setIsLoggedInAC(true))
        dispatch(setUserAC(res.user))
      })
      .catch(err => {
        console.log('error - loginTC ', err)
      })
  }
}