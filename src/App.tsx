import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {MyTasks} from './components/MyTasks'
import {LoginForm} from './components/login/LoginForm'
import {Layout} from 'antd'
const { Header, Content } = Layout;

export const App = () => {
  return (
    <div>
      <Layout>
        <Header>Header</Header>
        <Content>
          <Switch>
            <Route exact path={'/'} render={() => <MyTasks/>}/>
            <Route path={'/login'} render={() => <LoginForm/>}/>
            <Route path={'/404'} render={() => <h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
            <Redirect from={'*'} to={'/404'}/>
          </Switch>
        </Content>
      </Layout>
    </div>
  )
}