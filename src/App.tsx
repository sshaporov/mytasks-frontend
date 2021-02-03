import React, {useCallback, useEffect} from 'react'
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

const {Header, Content} = Layout

export const App = () => {
  DEV_VERSION && console.log('App')

  const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
  const isInitialized = useSelector<AppStateType, boolean>(state => state.auth.isInitialized)
  const requestStatus = useSelector<AppStateType, RequestStatusType>(state => state.request.status)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authMeTC())
  }, [dispatch])

  const logout = useCallback(() => {
    dispatch(logoutAC())
  }, [dispatch])

  if (!isInitialized) {
    return (
      <div className='spin-align'>
        <Spin/>
      </div>
    )
  }

  return (
    <div>
      <Layout>
        <Header className='wrapperHeader-app'>
          <NavLink className='wrapperLogoBlock-app' to={'/'}>
            <img src={taskLogo} className={'imgLogo-app'}/>
            <div>MyTasks</div>
          </NavLink>
          {isAuth && <HeaderContent logout={logout}/>}
        </Header>
        {requestStatus === 'loading' && <div className='spin-align'><Spin/></div>}
        <Content>
          <Switch>
            <Route exact path={'/'} render={() => <MyTasks/>}/>
            <Route path={'/login'} render={() => <LoginForm/>}/>
            <Route path={'/registration'} render={() => <RegistrationForm/>}/>
            <Route path={'/settings'} render={() => <Settings/>}/>
            <Route path={'/404'} render={() => <Page404/>}/>
            <Redirect from={'*'} to={'/404'}/>
          </Switch>
        </Content>

      </Layout>
    </div>
  )
}

