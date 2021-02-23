import React, {ChangeEvent, useState} from 'react'
import {Button, Input, message, Tabs} from 'antd'
import {MailOutlined, UserOutlined, LockOutlined} from '@ant-design/icons'
import './profile.css'
import {DEV_VERSION} from '../../config'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../bll/store'
import {NavLink, Redirect} from 'react-router-dom'
import {changeUserDataTC} from '../../bll/user-reducer';

const { TabPane } = Tabs

export const Profile: React.FC = React.memo(() => {
  DEV_VERSION && console.log('Profile')

  const userName = useSelector<AppStateType, string | null>(state => state.user.name)
  const email = useSelector<AppStateType, string>(state => state.user.email)
  const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

  const dispatch = useDispatch()

  const [name, setName] = useState<string | null>(userName)
  const [userEmail, setUserEmail] = useState<string>(email)

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }
  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.currentTarget.value)
  }
  const changeUserData = () => {
    dispatch(changeUserDataTC(name !== null ? name : '', userEmail))
  }

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

                <Input
                  value={name !== null ? name : ''}
                  onChange={changeName}
                />

              </div>
              <div className='wrapper-item'>
                <MailOutlined/>
                <div className='user-item'>Email:</div>

                <Input
                  value={userEmail}
                  onChange={changeEmail}
                />

              </div>
              <Button
                type='link'
                className='edit-button'
                // onClick={ () => message.warn('Sorry, Edit flow is not implemented yet...')}
                onClick={changeUserData}
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