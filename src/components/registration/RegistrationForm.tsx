import React, {useCallback} from 'react'
import {Form, Input, Button,} from 'antd'
import './registrationForm.css'
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../bll/store';
import {registrationTC, setIsRegisterAC} from '../../bll/registration-reducer';
import {NavLink} from 'react-router-dom';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

export type RegistrationDataType = {
  name?: string
  email: string
  password: string
}

export const RegistrationForm = () => {
  const isRegister = useSelector<AppStateType, boolean>(state => state.registration.isRegister)

  const dispatch = useDispatch()

  const onFinish = useCallback((values: RegistrationDataType) => {
    console.log('Received values of form: ', values)
    dispatch(registrationTC(values))
  }, [dispatch, isRegister])

  if (isRegister) {
    return (
        <div>
          Register SUCCESS, now you can log in by the <NavLink to={'/login'}>Log in</NavLink>
        </div>
    )
  }

  return (

    <Form
      {...layout}
      name="register"
      className='registration-form'
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Name"
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min: 3,
            message: 'Password should be more than 3 symbols!',
          },
        ]}
        hasFeedback
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          {
            min: 3,
            message: 'Password should be more than 3 symbols!',
          },

          // вынести отдельно и обернуть в useCallback
          ({getFieldValue}) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>

    </Form>
  )
}