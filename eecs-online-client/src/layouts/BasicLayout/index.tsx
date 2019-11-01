import React, { useState } from 'react';
import { Layout, Icon } from 'antd';
import withRouter from 'umi/withRouter';
import { PageMatchModel, CustomLocation } from '@/interfaces/component';
import NavMenu from './components/NavMenu';
import Footer from './components/Footer';
import styles from './index.less';

const { Header, Content, Sider } = Layout;

interface BasicLayoutProps {
  location: CustomLocation;
  match: PageMatchModel;
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const [collapsed, changeCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={80}>
        <div className={styles.logo} />
        <NavMenu />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className={styles.trigger}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => changeCollapsed(!collapsed)}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default withRouter(BasicLayout);
