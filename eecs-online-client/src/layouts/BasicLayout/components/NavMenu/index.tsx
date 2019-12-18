import React, { useState } from 'react';
import { Menu } from 'antd';
import _ from 'lodash';
import Link from 'umi/link';
import { connect } from 'dva';
import CustomIcon from '@/components/CustomIcon';
import { MenuListItemModel } from '@/interfaces/components';
import userUtils from '@/utils/user-utils';
import { CurrentUserModels } from '@/models/user';
import menuConfig from '../../../../../config/menuConfig';


interface NavMenuProps extends RoutingType {
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
  const currentUser: CurrentUserModels = userUtils.getUserInfo();
  const { userType } = currentUser;
  const currentUserType = userType;

  const [selectedKeys, setSelectedKeys] = useState(() => {
    const { pathname } = props.location;
    return [pathname.split('/').slice(1, 3).join('-')];
  });

  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={selectedKeys}
      onSelect={({ key }: { key: string }) => {
        setSelectedKeys([key]);
      }}
    >
      {menuConfig.map((item: MenuListItemModel) => {
        if (item.userType === currentUserType) {
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
        }
        return null
      })}
    </Menu>
  )
}

interface RoutingType {
  location: Location
}

export default connect(({ router }: { router: RoutingType }) => ({
  location: router.location,
}))(NavMenu);
