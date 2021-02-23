import {instance} from './instance'

export const userAPI = {
  user(data: UserType) {
    return instance.post<UserResponseType>(`/user`, data).then(res => res.data)
  },
}

// types
export type UserType = {
  _id: string
  name?: string
  email: string
}
export type UserResponseType = {
  message: string
}

