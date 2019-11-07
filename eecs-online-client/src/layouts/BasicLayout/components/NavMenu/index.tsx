import React, { useState } from 'react';
import { Menu } from 'antd';
import _ from 'lodash';
import CustomIcon from '@/components/CustomIcon';
import menuConfig from '@/menuConfig';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import { PageMatchModel, CustomLocation } from '@/interfaces/component';

interface NavMenuProps {
  location: CustomLocation;
  match: PageMatchModel;
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

const NavMenu: React.SFC<NavMenuProps> = ({ location, match }) => {
  const [selectedKeys, setSelectedKeys] = useState(() => {
    const { pathname } = location;
    return [pathname.split('/')[1]];
  });

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      onSelect={({ key }: { key: string }) => {
        setSelectedKeys([key]);
      }}
    >
      {menuConfig.map(item => {
        if (item.children && !_.isEmpty(item.children)) {
          return (
            <Menu.SubMenu
              key={item.key}
              title={
                // <span className={styles.title}>
                //   <CustomIcon name={item.icon} />
                //   {item.name}
                // </span>
                // <React.Fragment>
                //   <Icon type="pie-chart" />
                //   <span>Option 1</span>
                // </React.Fragment>
                <MenuTitle icon={item.icon} name={item.name} />
              }
            >
              {item.children.map(ele => (
                <Menu.Item key={ele.key}>
                  {ele.link ? (
                    <Link to={ele.link}>
                      {/* <span className={styles.title}>
                        <CustomIcon name={ele.icon} />
                        <span>{ele.name}</span>
                      </span> */}
                      {/* <Icon type="pie-chart" />
                      <span>Option 1</span> */}
                      <MenuTitle icon={ele.icon} name={ele.name} />
                    </Link>
                  ) : (
                      // <span className={styles.title}>
                      //   <CustomIcon name={ele.icon} />
                      //   <span>{ele.name}</span>
                      // </span>
                      // <React.Fragment>
                      //   <Icon type="pie-chart" />
                      //   <span>Option 1</span>
                      // </React.Fragment>
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
                {/* <span className={styles.title}>
                  <CustomIcon name={item.icon} />
                  <span>{item.name}</span>
                </span> */}
                <MenuTitle icon={item.icon} name={item.name} />
              </Link>
            ) : (
                // <span className={styles.title}>
                //   <CustomIcon name={item.icon} />
                //   <span>{item.name}</span>
                // </span>
                <MenuTitle icon={item.icon} name={item.name} />
              )}
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export default withRouter(NavMenu);
