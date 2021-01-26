import React from 'react'
import {Form, Input, Button} from 'antd'
import {MailOutlined, LockOutlined} from '@ant-design/icons'
import './loginForm.css'
import {NavLink} from 'react-router-dom'

export type LoginDataType = {
  email: string
  password: string
}

export const LoginForm = () => {
  const onFinish = (values: LoginDataType) => {
    console.log('Received values of form: ', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  };

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