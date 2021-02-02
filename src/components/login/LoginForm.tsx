import React from 'react'
import {Form, Input, Button} from 'antd'
import {MailOutlined, LockOutlined} from '@ant-design/icons'
import './loginForm.css'
import {NavLink, Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {DEV_VERSION} from '../../config'
import {loginTC} from '../../bll/auth-reducer'
import {AppStateType} from '../../bll/store'

export type LoginDataType = {
  email: string
  password: string
}

export const LoginForm = () => {
  DEV_VERSION && console.log('LoginForm')

  const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
  const dispatch = useDispatch()

  const onFinish = (values: LoginDataType) => {
    dispatch(loginTC(values))
  }

  if (isAuth) {
    return <Redirect to={'/'}/>
  }

  return (
    <div className='wrapper-loginForm'>
      <div className='content-loginForm'>
        <Form
          name='login'
          initialValues={{remember: true,}}
          onFinish={onFinish}
        >
          <div className='title-loginForm'>
            Log in
          </div>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
              {
                type: 'email',
                message: 'Please input correct Email!',
              },
            ]}
          >
            <Input prefix={<MailOutlined className='site-form-item-icon'/>} placeholder='Email'/>
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon'/>}
              type='password'
              placeholder='Password'
              autoComplete='on'
            />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Log in
            </Button>
            Or <NavLink to='/registration'>register now!</NavLink>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}