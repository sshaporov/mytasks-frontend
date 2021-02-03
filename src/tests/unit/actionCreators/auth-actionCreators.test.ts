import {ACTIONS_AUTH_TYPE, logoutAC, setIsAuthAC, setIsInitializedAC} from '../../../bll/auth-reducer'

it('ActionCreator setIsAuth works correctly', () => {
  const setIsAuthACObj = setIsAuthAC(true)
  expect(setIsAuthACObj).toEqual({
    type: ACTIONS_AUTH_TYPE.SET_IS_AUTH,
    value: true,
  })
})

it('ActionCreator setIsInitialized works correctly', () => {
  const setIsInitACObj = setIsInitializedAC(true)
  expect(setIsInitACObj).toEqual({
    type: ACTIONS_AUTH_TYPE.SET_IS_INITIALIZED,
    value: true,
  })
})

it('ActionCreator logout works correctly', () => {
  const logoutACObj = logoutAC()
  expect(logoutACObj).toEqual({
    type: ACTIONS_AUTH_TYPE.LOGOUT,
  })
})