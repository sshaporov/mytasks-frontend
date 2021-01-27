import React from 'react'
import {Form, Input, Button} from 'antd'
import {MailOutlined, LockOutlined} from '@ant-design/icons'
import './loginForm.css'
import {NavLink, Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {DEV_VERSION} from '../../config'
import {loginTC} from '../../bll/auth-reducer'
import {AppStateType} from '../../bll/store';

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

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  };

  if (isAuth) {
    return <Redirect to={'/'}/>
  }

  return (
    <Form
      name="login"
      className="login-form"
      initialValues={{remember: true,}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

      <Form.Item
        name="email"
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
        <Input prefix={<MailOutlined className="site-form-item-icon"/>} placeholder="Email"/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon"/>}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <NavLink to={'/registration'}>register now!</NavLink>
      </Form.Item>
    </Form>
  );
};