import {authReducer, AuthStateType, setIsAuthAC, setIsInitializedAC} from '../../../bll/auth-reducer'

let startAuthState: AuthStateType

beforeEach(() => {
  startAuthState = {
    isAuth: false,
    isInitialized: false,
  }
})

it('isAuth value should be set to the true', () => {
  const endState = authReducer(startAuthState, setIsAuthAC(true))
  expect(endState.isAuth).toBe(true)
})

it('isInitialized value should be set to the true', () => {
  const endState = authReducer(startAuthState, setIsInitializedAC(true))
  expect(endState.isInitialized).toBe(true)
})