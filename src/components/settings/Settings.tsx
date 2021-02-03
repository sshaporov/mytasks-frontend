import React from 'react'
import {DEV_VERSION} from '../../config'
import { NavLink } from 'react-router-dom';

export const Settings = React.memo(() => {
  DEV_VERSION && console.log('MyTasks')

  return (
    <div>
      <NavLink to={'/'}>Go Home</NavLink>
    </div>
  )
})