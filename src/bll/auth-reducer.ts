import {Dispatch} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {AppStateType} from './store'
import {authAPI} from '../dal/auth-api'
import {LoginDataType} from '../components/login/LoginForm'
import {setUserAC, UserACType} from './user-reducer'

export enum ACTIONS_AUTH_TYPE {
  SET_IS_LOGGED_IN = 'Auth/SET_IS_LOGGED_IN',
  LOGOUT = 'Auth/LOGOUT',
}

export type AuthStateType = {
  isAuth: boolean
}
const initialState: AuthStateType = {
  isAuth: false
}

export const authReducer = (state: AuthStateType = initialState, action: AuthACType): AuthStateType => {
  switch (action.type) {

    case ACTIONS_AUTH_TYPE.SET_IS_LOGGED_IN:
      return {...state, isAuth: action.value}

    case ACTIONS_AUTH_TYPE.LOGOUT:
      localStorage.removeItem('token')
      return {...state, isAuth: false}

    default:
      return state
  }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({type: ACTIONS_AUTH_TYPE.SET_IS_LOGGED_IN, value} as const)

export const logoutAC = () =>
  ({type: ACTIONS_AUTH_TYPE.LOGOUT} as const)

// types
export type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export type LogoutACType = ReturnType<typeof logoutAC>
export type AuthACType = SetIsLoggedInACType | LogoutACType | UserACType
export type AuthThunkType = ThunkAction<void, AppStateType, Dispatch<AuthACType>, AuthACType>

// thunks
export const loginTC = (data: LoginDataType): AuthThunkType => {
  return (dispatch) => {
    authAPI.login(data)
      .then(res => {
        dispatch(setIsLoggedInAC(true))
        dispatch(setUserAC(res.user))
        localStorage.setItem('token', res.token)
      })
      .catch(err => {
        console.log('error - loginTC ', err)
      })
  }
}

export const authMeTC = (): AuthThunkType => {
  return (dispatch) => {
    authAPI.authMe()
      .then(res => {
        dispatch(setUserAC(res.user))
        dispatch(setIsLoggedInAC(true))
        localStorage.setItem('token', res.token)
      })
      .catch(err => {
        dispatch(setIsLoggedInAC(false))
        localStorage.removeItem('token')
      })
  }
}