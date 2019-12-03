import React from 'react';
import { Tabs } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import LoginForm from './components/LoginForm';
import { USER_TYPE } from '@/enums';
import styles from './index.less';

const { TabPane } = Tabs;

const TabPanes: React.ReactNode[] = [
  <TabPane tab="学生登录" key={String(USER_TYPE.Student)}>
    <LoginForm />
  </TabPane>,
  <TabPane tab="教师登录" key={String(USER_TYPE.Teacher)}>
    <LoginForm />
  </TabPane>,
]

interface LoginProps {
  dispatch: Dispatch<any>;
  userType: USER_TYPE.Student | USER_TYPE.Teacher,
}

const Login: React.FC<LoginProps> = props => (
  <div className={styles.main}>
    <Tabs animated={false} activeKey={String(props.userType)} onChange={(activeKey: string) => {
      props.dispatch({
        type: 'login/changeUserType',
        payload: activeKey,
      })
    }}>
      {...TabPanes}
    </Tabs>
  </div>
)

const mapStateToProps = (state: any) => {
  const { userType } = state.login;
  return {
    userType,
  }
}

export default connect(mapStateToProps)(Login);
