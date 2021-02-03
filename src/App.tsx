import React, {CSSProperties, useCallback, useEffect} from 'react'
import {Route, Switch, Redirect, NavLink} from 'react-router-dom'
import {MyTasks} from './components/MyTasks'
import {LoginForm} from './components/login/LoginForm'
import {Layout, Spin} from 'antd'
import {RegistrationForm} from './components/registration/RegistrationForm'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from './bll/store'
import {authMeTC, logoutAC} from './bll/auth-reducer'
import {Page404} from './components/common/page404/Page404'
import './app.css'
import {RequestStatusType} from './bll/request-reducer'
import {HeaderContent} from './components/headerContent/HeaderContent'
import {Settings} from './components/settings/Settings'
import {DEV_VERSION} from './config'
import taskLogo from './img/tasks.png'
import {Profile} from './components/profile/Profile';

const {Header, Content} = Layout

export const App = () => {
  DEV_VERSION && console.log('App')

  // additional css styles for Spin ant-design component
  const spinStyles: CSSProperties = {
    position: 'fixed',
    top: '50%',
    textAlign: 'center',
    width: '100%',
    zIndex: 1,
  }

  const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
  const isInitialized = useSelector<AppStateType, boolean>(state => state.auth.isInitialized)
  const requestStatus = useSelector<AppStateType, RequestStatusType>(state => state.request.status)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authMeTC())
  }, [dispatch])

  // without backend logic (only front side)
  const logout = useCallback(() => {
    dispatch(logoutAC())
  }, [dispatch])

  if (!isInitialized) {
    return <Spin style={spinStyles}/>
  }

  return (
    <div>
      <Layout>
        <Header className='wrapper-header'>
          <NavLink className='logo-block' to='/'>
            <img src={taskLogo} className='img-logo'/>
            <div>MyTasks</div>
          </NavLink>
          {isAuth && <HeaderContent logout={logout}/>}
        </Header>
        {requestStatus === 'loading' && <Spin style={spinStyles}/>}
        <Content>
          <Switch>
            <Route exact path='/' render={() => <MyTasks/>}/>
            <Route path='/login' render={() => <LoginForm/>}/>
            <Route path='/registration' render={() => <RegistrationForm/>}/>
            <Route path='/profile' render={() => <Profile/>}/>
            <Route path='/settings' render={() => <Settings/>}/>
            <Route path='/404' render={() => <Page404/>}/>
            <Redirect from='*' to='/404'/>
          </Switch>
        </Content>

      </Layout>
    </div>
  )
}

