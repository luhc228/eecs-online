import { Tabs } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import React from 'react';
import RegisterForm from './components/RegisterForm';
import { USER_TYPE } from '@/enums';
import styles from './index.less';

const { TabPane } = Tabs;

const TabPanes: React.ReactNode[] = [
  <TabPane tab="学生注册" key={String(USER_TYPE.Student)}>
    <RegisterForm />
  </TabPane>,
  <TabPane tab="教师注册" key={String(USER_TYPE.Teacher)}>
    <RegisterForm />
  </TabPane>,
];

interface RegisterProps {
  dispatch: Dispatch<any>;
  userType: USER_TYPE;
}

const Register: React.FC<RegisterProps> = props => (
  <div className={styles.main}>
    <Tabs
      animated={false}
      activeKey={String(props.userType)}
      onChange={(activeKey: string) => {
        props.dispatch({
          type: 'register/changeUserType',
          payload: activeKey,
        });
      }}
    >
      {...TabPanes}
    </Tabs>
  </div>
);

const mapStateToProps = (state: any) => {
  const { userType } = state.register;
  return {
    userType,
  };
};

export default connect(mapStateToProps)(Register);
