import * as React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import { Dispatch } from 'redux';
import NavMenu from './components/NavMenu';
import Footer from './components/Footer';
import styles from './index.less';
import { ConnectState } from '@/models/connect';
import Header from './components/Header';

const { Content, Sider } = Layout;

interface BasicLayoutProps {
  collapsed: boolean,
  dispatch: Dispatch<any>;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ collapsed, children }) => (
  <Layout>
    <Sider trigger={null} collapsible width={250} collapsed={collapsed} collapsedWidth={80}>
      <div className={styles.logo} />
      <NavMenu />
    </Sider>
    <Layout>
      <Header />
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 280,
        }}
      >
        {children}
      </Content>
      <Footer />
    </Layout>
  </Layout>
);

export default withRouter(connect(({ global }: ConnectState) => ({
  collapsed: global.collapsed,
}))(BasicLayout));
