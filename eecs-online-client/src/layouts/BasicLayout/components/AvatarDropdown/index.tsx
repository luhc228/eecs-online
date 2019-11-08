import React, { useState } from 'react';
import { Avatar, Icon, Menu } from 'antd';
import { connect } from 'dva';
import { ClickParam } from 'antd/es/menu';
import { Dispatch } from 'redux';
import HeaderDropdown from '@/components/CustomDropdown';
import styles from './index.less';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';

interface AvatarDropdownProps {
  currentUser?: CurrentUser;
  dispatch: Dispatch<any>;
}

const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

const AvatarDropdown: React.SFC<AvatarDropdownProps> = props => {
  const [color] = useState(colorList[0]);

  const onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = props;
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
    }
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <Icon type="logout" />
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  const { currentUser = {} } = props;
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar className={styles.avatar} style={{ backgroundColor: color, verticalAlign: 'middle' }} size="small" alt="avatar">
          {currentUser.name && currentUser.name[0]}
        </Avatar>
        {/* <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" /> */}
        <span className={styles.name}>{currentUser.id}</span>
      </span>
    </HeaderDropdown>
  )
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
