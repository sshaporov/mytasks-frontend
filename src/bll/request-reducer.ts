import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './store';
import {Dispatch} from 'redux';
import {AuthACType} from './auth-reducer';

export enum ACTIONS_REQUEST_TYPE {
  SET_IS_AUTH = 'Request/SET_IS_AUTH',
  SET_IS_INITIALIZED = 'Request/SET_IS_INITIALIZED',
  LOGOUT = 'Auth/LOGOUT',
}
export type RequestStatusType = 'init' | 'loading' | 'succeeded' | 'failed'
export type RequestStateType = {
  status: RequestStatusType
  error: string | null
}
const initialState: RequestStateType = {
  status: 'init',
  error: null,
}

export const appReducer = (state: RequestStateType = initialState, action: RequestACType): RequestStateType => {
  switch (action.type) {

    case 'APP/SET-STATUS':
      return {...state, status: action.status}

    case 'APP/SET-ERROR':
      return {...state, error: action.error}

    default:
      return {...state}
  }
}

// actions
export const setErrorAC = (error: string | null) =>
  ({ type: 'APP/SET-ERROR', error } as const)

export const setStatusAC = (status:  RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', status } as const)

// types
export type SetRequestErrorACType = ReturnType<typeof setErrorAC>
export type SetStatusACType = ReturnType<typeof setStatusAC>
export type RequestACType = SetRequestErrorACType | SetStatusACType