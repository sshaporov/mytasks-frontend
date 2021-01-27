import {instance} from './instance'
import {RegistrationDataType} from '../components/registration/RegistrationForm'
import {LoginDataType} from '../components/login/LoginForm';

export const authAPI = {
  login(data: LoginDataType) {
    return instance.post<LoginResponseType>(`/auth/login`, data).then(res => res.data)
  },
  registration(data: RegistrationDataType) {
    return instance.post<RegistrationResponseType>(`/auth/registration`, data).then(res => res.data)
  },
  authMe() {
    return instance.get<LoginResponseType>(`/auth/me`,
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      .then(res => res.data)
  },
}

// types
export type UserType = {
  _id: string
  name?: string
  email: string
}
export type LoginResponseType = {
  token: string
  user: UserType
}
export type RegistrationResponseType = {
  message: string
}

