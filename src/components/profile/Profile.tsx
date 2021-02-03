import React from 'react'
import {NavLink} from 'react-router-dom';

export const Profile = React.memo(() => {
  return (
    <div>
      <NavLink to={'/'}>Go Home</NavLink>
    </div>
  )
})