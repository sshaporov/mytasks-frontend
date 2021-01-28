import {AppReducersType, AppThunksType} from './store'
import {authAPI} from '../dal/auth-api'
import {RegistrationDataType} from '../components/registration/RegistrationForm'

export enum ACTIONS_REGISTRATION_TYPE {
  SET_IS_REGISTER = 'Login/SET_IS_REGISTER',
}

export type RegistrationStateType = {
  isRegister: boolean
}
const initialState: RegistrationStateType = {
  isRegister: false
}

export const registrationReducer = (state: RegistrationStateType = initialState, action: AppReducersType): RegistrationStateType => {
  switch (action.type) {

    case ACTIONS_REGISTRATION_TYPE.SET_IS_REGISTER:
      return {...state, isRegister: action.value}

    default:
      return state
  }
}

// actions
export const setIsRegisterAC = (value: boolean) =>
  ({type: ACTIONS_REGISTRATION_TYPE.SET_IS_REGISTER, value} as const)

// types
export type SetIsRegisterACType = ReturnType<typeof setIsRegisterAC>
export type RegistrationACType = SetIsRegisterACType

// thunks
export const registrationTC = (data: RegistrationDataType): AppThunksType => {
  return (dispatch) => {
    authAPI.registration(data)
      .then(() => {
        dispatch(setIsRegisterAC(true))
      })
      .catch(err => {
        console.log('error - registrationTC ', err)
      })
  }
}