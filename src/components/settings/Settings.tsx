import React from 'react'
import {DEV_VERSION} from '../../config'
import {NavLink, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../bll/store';

export const Settings = React.memo(() => {
  DEV_VERSION && console.log('MyTasks')

  const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

  if(!isAuth) {
    return <Redirect to='/login'/>
  }

  return (
    <div>
      <NavLink to={'/'}>Go Home</NavLink>
    </div>
  )
})