import {instance} from './instance'
import {UserType} from './auth-api'

export const userAPI = {
  changeUser(name: string, email: string) {
    return instance.put<UserType>(`/user`, {name, email},
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      .then(res => res.data)
  },
}

