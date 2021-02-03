import React, {ChangeEvent, useCallback, useState} from 'react'
import {DEV_VERSION} from '../../config'
import {Dropdown, Menu, Input, Avatar} from 'antd'
import {LogoutOutlined, ProfileOutlined, UserOutlined, SettingOutlined} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../bll/store'
import {NavLink} from 'react-router-dom'
import './HeaderContent.css'
import {setSearchCardTitleAC} from '../../bll/search-reducer';
import {getCardsTC} from '../../bll/cards-reducer';

const {Search} = Input


export type HeaderContentType = {
  logout: () => void
}
export const HeaderContent: React.FC<HeaderContentType> = React.memo((
  {
    logout
  }
) => {
  DEV_VERSION && console.log('HeaderContent')

  const userName = useSelector<AppStateType, string | null>(state => state.user.name)
  const userEmail = useSelector<AppStateType, string>(state => state.user.email)
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined)
  const dispatch = useDispatch()

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value)
  }

  const onSearch = useCallback(() => {
    dispatch(setSearchCardTitleAC(searchInput))
    dispatch(getCardsTC())
  },[dispatch, searchInput])

  const menu = (
    <Menu onClick={() => {
    }}>
      <Menu.Item key="1" icon={<ProfileOutlined/>} onClick={() => {
      }}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined/>} onClick={() => {
      }}>
        <NavLink to={'/settings'}>Settings</NavLink>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="3" danger icon={<LogoutOutlined/>} onClick={logout}>
        Log out
      </Menu.Item>
    </Menu>
  )

  return (
    <div className='wrapper-headerContent'>
      <Search
        placeholder="input card title"
        onSearch={onSearch}
        value={searchInput}
        enterButton
        className={'search-headerContent'}
        onChange={onChangeSearchInput}
      />
      <Dropdown overlay={menu} trigger={['click']} >
        <div className={'wrapper-dropdown'}>
          <Avatar icon={<UserOutlined/>}/>
          <div>
            <a className='dropdown-link' href='!#'>
              {
                !userName
                  ? userEmail
                  : userName
              }
            </a>
          </div>
        </div>
      </Dropdown>
    </div>

  )
})