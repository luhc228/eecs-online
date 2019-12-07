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
import Breadcrumb from './components/Breadcrumb';

const { Content, Sider } = Layout;

interface BasicLayoutProps {
  collapsed: boolean,
  dispatch: Dispatch<any>;
  location: Location;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ collapsed, children, location }) => {
  console.log(location)
  return (
    <Layout>
      <Sider trigger={null} collapsible width={250} collapsed={collapsed} collapsedWidth={80}>
        <div className={styles.logo} />
        <NavMenu />
      </Sider>
      <Layout>
        <Header />
        <Breadcrumb location={location} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 800,
          }}
        >
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
};

export default withRouter(connect(({ global }: ConnectState) => ({
  collapsed: global.collapsed,
  // location: Location,
}))(BasicLayout));
