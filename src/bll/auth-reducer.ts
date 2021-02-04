import {AppReducersType, AppThunksType} from './store'
import {authAPI} from '../dal/auth-api'
import {LoginDataType} from '../components/login/LoginForm'
import {setUserAC, UserACType} from './user-reducer'
import {setErrorAC} from './request-reducer';

export enum ACTIONS_AUTH_TYPE {
  SET_IS_AUTH = 'Auth/SET_IS_AUTH',
  SET_IS_INITIALIZED = 'Auth/SET_IS_INITIALIZED',
  LOGOUT = 'Auth/LOGOUT',
}

export type AuthStateType = {
  isAuth: boolean
  isInitialized: boolean
}
const initialState: AuthStateType = {
  isAuth: false,
  isInitialized: false
}

export const authReducer = (state: AuthStateType = initialState, action: AppReducersType): AuthStateType => {
  switch (action.type) {

    case ACTIONS_AUTH_TYPE.SET_IS_AUTH:
      return {...state, isAuth: action.value}

    case ACTIONS_AUTH_TYPE.SET_IS_INITIALIZED:
      return {...state, isInitialized: action.value}

    case ACTIONS_AUTH_TYPE.LOGOUT:
      localStorage.removeItem('token')
      return {...state, isAuth: false}

    default:
      return state
  }
}

// actions
export const setIsAuthAC = (value: boolean) =>
  ({type: ACTIONS_AUTH_TYPE.SET_IS_AUTH, value} as const)

export const setIsInitializedAC = (value: boolean) =>
  ({type: ACTIONS_AUTH_TYPE.SET_IS_INITIALIZED, value} as const)

export const logoutAC = () =>
  ({type: ACTIONS_AUTH_TYPE.LOGOUT} as const)

// types
export type SetIsLoggedInACType = ReturnType<typeof setIsAuthAC>
export type SetIsInitializedACType = ReturnType<typeof setIsInitializedAC>
export type LogoutACType = ReturnType<typeof logoutAC>
export type AuthACType = SetIsLoggedInACType | LogoutACType | UserACType | SetIsInitializedACType

// thunks
export const loginTC = (data: LoginDataType): AppThunksType => {
  return (dispatch) => {
    authAPI.login(data)
      .then(res => {
        localStorage.setItem('token', res.token)
        dispatch(setIsAuthAC(true))
        dispatch(setUserAC(res.user))
      })
      .catch(err => {
        dispatch(setErrorAC(err.response.data.message))
      })
  }
}

export const authMeTC = (): AppThunksType => {
  return (dispatch) => {
    authAPI.authMe()
      .then(res => {
        localStorage.setItem('token', res.token)
        dispatch(setUserAC(res.user))
        dispatch(setIsAuthAC(true))
        dispatch(setIsInitializedAC(true))
      })
      .catch(err => {
        dispatch(setIsAuthAC(false))
        dispatch(setIsInitializedAC(true))
        localStorage.removeItem('token')
        console.log('error - authMeTC ', err)
      })
  }
}