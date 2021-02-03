import {ACTIONS_REQUEST_TYPE, setErrorAC, setStatusAC} from '../../../bll/request-reducer'

it('ActionCreator setError works correctly', () => {
  const setErrorACObj = setErrorAC('test Error text')
  expect(setErrorACObj).toEqual({
    type: ACTIONS_REQUEST_TYPE.SET_ERROR,
    error: 'test Error text',
  })
})

it('ActionCreator setStatus works correctly', () => {
  const setStatusACObj = setStatusAC('loading')
  expect(setStatusACObj).toEqual({
    type: ACTIONS_REQUEST_TYPE.SET_STATUS,
    status: 'loading',
  })
})