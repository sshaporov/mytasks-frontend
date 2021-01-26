import React from 'react'
import {Route, Switch, Redirect, NavLink} from 'react-router-dom'
import {MyTasks} from './components/MyTasks'
import {LoginForm} from './components/login/LoginForm'
import {Button, Layout} from 'antd'
import {RegistrationForm} from './components/registration/RegistrationForm'
import {useSelector} from 'react-redux';
import {AppStateType} from './bll/store';

const {Header, Content} = Layout

export const App = () => {
  const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)

  return (
    <div>
      <Layout>

        <Header>
          <NavLink to={'/login'}>Log in</NavLink>
          {isLoggedIn && <Button>Log out</Button>}
        </Header>

        <Content>
          <Switch>
            <Route exact path={'/'} render={() => <MyTasks/>}/>
            <Route path={'/login'} render={() => <LoginForm/>}/>
            <Route path={'/registration'} render={() => <RegistrationForm/>}/>
            <Route path={'/404'} render={() => <h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
            <Redirect from={'*'} to={'/404'}/>
          </Switch>
        </Content>

      </Layout>
    </div>
  )
}