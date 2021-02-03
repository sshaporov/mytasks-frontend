import {ACTIONS_REGISTRATION_TYPE, setIsRegisterAC} from '../../../bll/registration-reducer'

it('ActionCreator setIsRegister works correctly', () => {
  const setRegisterACObj = setIsRegisterAC(true)
  expect(setRegisterACObj).toEqual({
    type: ACTIONS_REGISTRATION_TYPE.SET_IS_REGISTER,
    value: true,
  })
})