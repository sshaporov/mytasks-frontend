import {DEV_VERSION} from '../../../config'
import React from 'react'

export const CardHeader = React.memo(() => {
  DEV_VERSION && console.log('CardFooter')

  return (
   <div>CardHeader</div>
  )
})