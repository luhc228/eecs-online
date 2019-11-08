import * as React from 'react';
import { Layout, Icon } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import styles from './index.less';
import AvatarDropdown from '../AvatarDropdown';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  dispatch: Dispatch<any>;
}

const LayoutHeader: React.SFC<HeaderProps> = ({ collapsed, dispatch }) => (
  <Header className={styles.header}>
    <Icon
      className={styles.trigger}
      type={collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={() => {
        dispatch({
          type: 'global/changeLayoutCollapsed',
          payload: !collapsed,
        })
      }
      }
    />
    <AvatarDropdown />
  </Header>
)

export default connect(({ global }: ConnectState) => ({
  collapsed: global.collapsed,
}))(LayoutHeader);
