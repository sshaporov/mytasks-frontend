import React from 'react'
import {Button, Input, message, Tabs} from 'antd'
import {MailOutlined, UserOutlined, LockOutlined} from '@ant-design/icons'
import './profile.css'
import {DEV_VERSION} from '../../config'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../bll/store'
import {NavLink, Redirect} from 'react-router-dom'


const { TabPane } = Tabs

export const Profile: React.FC = React.memo(() => {
  DEV_VERSION && console.log('Profile')

  const userName = useSelector<AppStateType, string | null>(state => state.user.name)
  const email = useSelector<AppStateType, string>(state => state.user.email)
  const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

  if(!isAuth) {
    return <Redirect to='/login'/>
  }

  return (

      <Tabs defaultActiveKey='1' centered>
        <TabPane tab='User data' key='1'>
          <div className='wrapper-user-tab'>
            <div className='content-user'>
              <div className='wrapper-item'>
                <UserOutlined />
                <div className='user-item'>Name:</div>
                <Input disabled value={userName !== null ? userName : ''} />
              </div>
              <div className='wrapper-item'>
                <MailOutlined/>
                <div className='user-item'>Email:</div>
                <Input disabled value={email} />
              </div>
              <Button
                type='link'
                className='edit-button'
                onClick={ () => message.warn('Sorry, Edit flow is not implemented yet...')}
              >
                Edit
              </Button>
            </div>
          </div>
        </TabPane>

        <TabPane tab='Security' key='2'>
          <div className='security-text'>
            <LockOutlined className='security-icon'/>
            Sorry, Security Tab is not implemented yet...
            <div>You can go to the <NavLink to='/'>Home</NavLink> page</div>
          </div>
        </TabPane>
      </Tabs>
  )
})