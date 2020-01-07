import * as React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import NavMenu from './components/NavMenu';
import Footer from './components/Footer';
import styles from './index.less';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import { GlobalModelState } from '@/models/global';

const { Content, Sider } = Layout;

interface BasicLayoutProps extends RoutingType {
  collapsed: boolean,
  dispatch: Dispatch<any>;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ collapsed, children, location }) => (
  <Layout style={{ display: 'flex' }}>
    <Sider trigger={null} collapsible width={250} collapsed={collapsed} collapsedWidth={80}>
      <div className={styles.logo} />
      <NavMenu />
    </Sider>
    <Layout>
      <Header />
      <div>
        <Breadcrumb location={location} />
      </div>
      <Content
        style={{
          margin: '24px 16px',
          padding: '5px 20px',
        }}
      >
        {children}
      </Content>
      <Footer />
    </Layout>
  </Layout>
);

interface RoutingType {
  location: Location
}

export default connect(({ global, router }: { global: GlobalModelState, router: RoutingType }) => ({
  collapsed: global.collapsed,
  location: router.location,
}))(BasicLayout);
