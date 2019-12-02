import React, { useState } from 'react';
import { Menu } from 'antd';
import _ from 'lodash';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import CustomIcon from '@/components/CustomIcon';
import menuConfig from '../../../../../config/menuConfig';
import { PageBasiocPropsModel } from '@/interfaces/components';

interface NavMenuProps extends PageBasiocPropsModel {
}

interface MenuTitleProps {
  icon?: string;
  name: string;
}

const MenuTitle: React.SFC<MenuTitleProps> = ({ icon, name }) => (
  <React.Fragment>
    {icon && <CustomIcon name={icon} />}
    <span>{name}</span>
  </React.Fragment>
)

const NavMenu: React.SFC<NavMenuProps> = props => {
  const [selectedKeys, setSelectedKeys] = useState(() => {
    const { pathname } = props.location;
    return [pathname.split('/').slice(1, 3).join('-')];
  });

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      onSelect={({ key }: { key: string }) => {
        console.log([key]);
        setSelectedKeys([key]);
      }}
    >
      {menuConfig.map(item => {
        if (item.children && !_.isEmpty(item.children)) {
          return (
            <Menu.SubMenu
              key={item.key}
              title={
                <MenuTitle icon={item.icon} name={item.name} />
              }
            >
              {item.children.map(ele => (
                <Menu.Item key={ele.key}>
                  {ele.link ? (
                    <Link to={ele.link}>
                      <MenuTitle icon={ele.icon} name={ele.name} />
                    </Link>
                  ) : (
                      <MenuTitle icon={ele.icon} name={ele.name} />
                    )}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          )
        }

        return (
          <Menu.Item key={item.key}>
            {item.link ? (
              <Link to={item.link}>
                <MenuTitle icon={item.icon} name={item.name} />
              </Link>
            ) : (
                <MenuTitle icon={item.icon} name={item.name} />
              )}
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export default withRouter(NavMenu);
