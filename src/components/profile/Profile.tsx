import React from 'react'
import {NavLink} from 'react-router-dom';
import {RegistrationForm} from '../registration/RegistrationForm';

export const Profile = React.memo(() => {
  return (
    <div>
      <NavLink to={'/'}>Go Home</NavLink>
      <RegistrationForm/>
    </div>
  )
})