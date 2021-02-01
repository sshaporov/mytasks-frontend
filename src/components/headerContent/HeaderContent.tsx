import React from 'react'
import {DEV_VERSION} from '../../config'
import {Dropdown, Menu} from 'antd'
import {LogoutOutlined, ProfileOutlined, UserOutlined, SettingOutlined} from '@ant-design/icons'
import {DownOutlined} from '@ant-design/icons'
import {useSelector} from 'react-redux';
import {AppStateType} from '../../bll/store';
import {NavLink} from 'react-router-dom';

export type HeaderContentType = {
  logout: () => void
}
export const HeaderContent: React.FC<HeaderContentType> = (
  {
    logout
  }
) => {
  DEV_VERSION && console.log('HeaderContent')

  const userName = useSelector<AppStateType, string | null>(state => state.user.name)
  const userEmail = useSelector<AppStateType, string>(state => state.user.email)

  const menu = (
    <Menu onClick={() => {
    }}>
      <Menu.Item key="1" icon={<ProfileOutlined/>} onClick={() => {}}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined/>} onClick={() => {}}>
        <NavLink to={'/settings'}>Settings</NavLink>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="3" danger icon={<LogoutOutlined/>} onClick={logout}>
        Log out
      </Menu.Item>
    </Menu>
  )

  return (
      <Dropdown overlay={menu} trigger={['click']}>
        <div>
          <UserOutlined />
          <a className="ant-dropdown-link">
            {
              !userName
                ? userEmail
                : userName
            }
            <DownOutlined />
          </a>
        </div>
      </Dropdown>
  )
}