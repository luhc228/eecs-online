import * as React from 'react';
import { Layout, Card } from 'antd';
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
          padding: '5px 20px',
          overflow: 'initial',
          // background: '#fff',
          // minHeight: 1000,
        }}
      >
        <Card>
          {children}
        </Card>
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
