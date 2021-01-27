export enum ACTIONS_REQUEST_TYPE {
  SET_STATUS = 'Request/SET_STATUS',
  SET_ERROR = 'Request/SET_ERROR',
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

export const requestReducer = (state: RequestStateType = initialState, action: RequestACType): RequestStateType => {
  switch (action.type) {

    case ACTIONS_REQUEST_TYPE.SET_STATUS:
      return {...state, status: action.status}

    case ACTIONS_REQUEST_TYPE.SET_ERROR:
      return {...state, error: action.error}

    default:
      return {...state}
  }
}

// actions
export const setErrorAC = (error: string | null) =>
  ({ type: ACTIONS_REQUEST_TYPE.SET_ERROR, error } as const)

export const setStatusAC = (status:  RequestStatusType) =>
  ({ type: ACTIONS_REQUEST_TYPE.SET_STATUS, status } as const)

// types
export type SetRequestErrorACType = ReturnType<typeof setErrorAC>
export type SetStatusACType = ReturnType<typeof setStatusAC>
export type RequestACType = SetRequestErrorACType | SetStatusACType