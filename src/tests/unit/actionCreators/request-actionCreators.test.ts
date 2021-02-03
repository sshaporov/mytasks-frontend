import {ACTIONS_REQUEST_TYPE, setErrorAC, setStatusAC} from '../../../bll/request-reducer'

it('ActionCreator setError works correctly', () => {
  const setIsAuthACObj = setErrorAC('test Error text')
  expect(setIsAuthACObj).toEqual({
    type: ACTIONS_REQUEST_TYPE.SET_ERROR,
    error: 'test Error text',
  })
})

it('ActionCreator setStatus works correctly', () => {
  const setIsAuthACObj = setStatusAC('loading')
  expect(setIsAuthACObj).toEqual({
    type: ACTIONS_REQUEST_TYPE.SET_STATUS,
    status: 'loading',
  })
})