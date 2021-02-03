import {ACTIONS_USER_TYPE, setUserAC} from '../../../bll/user-reducer'
import {UserType} from '../../../dal/auth-api'

it('ActionCreator setUser works correctly', () => {
  const user: UserType = {_id: 'id01', email: 'test@test.com', name: 'Test name'}
  const setUserACObj = setUserAC(user)
  expect(setUserACObj).toEqual({
    type: ACTIONS_USER_TYPE.SET_USER,
    payload: {_id: 'id01', email: 'test@test.com', name: 'Test name'},
  })
})