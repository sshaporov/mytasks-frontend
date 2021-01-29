import React from 'react'
import {DEV_VERSION} from '../../config'
import {Dropdown, Menu} from 'antd'
import {CheckOutlined, DeleteOutlined, EditOutlined, UserOutlined} from '@ant-design/icons'
import {DownOutlined} from '@ant-design/icons'

export type HeaderContentType = {
  logout: () => void
}
export const HeaderContent: React.FC<HeaderContentType> = (
  {
    logout
  }
) => {
  DEV_VERSION && console.log('HeaderContent')

  const menu = (
    <Menu onClick={() => {
    }}>
      <Menu.Item key="1" icon={<CheckOutlined/>} onClick={() => {}}>
        Marked
      </Menu.Item>
      <Menu.Item key="2" icon={<EditOutlined/>} onClick={() => {}}>
        Edit
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="3" danger icon={<DeleteOutlined/>} onClick={() => {}}>
        Remove
      </Menu.Item>
    </Menu>
  )

  return (
    <div onClick={logout}>
      <Dropdown overlay={menu} trigger={['click']}>
        <UserOutlined />

        {/*падает ошибка если здесь есть какието данные*/}

        {/*NAME*/}
        {/*<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>sdfadfgadf<DownOutlined/></a>*/}
      </Dropdown>
      heloo
    </div>
  )
}