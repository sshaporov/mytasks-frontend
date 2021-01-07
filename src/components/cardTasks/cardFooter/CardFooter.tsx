import {DEV_VERSION} from '../../../config'
import React from 'react'

export const CardFooter = React.memo(() => {
  DEV_VERSION && console.log('CardFooter')

  return (
   <div>CardFooter</div>
  )
})