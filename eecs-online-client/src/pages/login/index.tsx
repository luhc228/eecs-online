import React from 'react';
import { Form, Tabs } from 'antd';
import LoginForm from './components/LoginForm';
import styles from './index.less';

const { TabPane } = Tabs;

const TabPanes: React.ReactNode[] = [
  <TabPane tab="学生登录" key="studentLogin">
    <LoginForm />
  </TabPane>,
  <TabPane tab="教师登录" key="teacherLogin">
    <LoginForm />
  </TabPane>
]

const Login: React.FC = () => {
  return (
    <div className={styles.main}>
      <Tabs animated={false}>
        {...TabPanes}
      </Tabs>
    </div>
  )
}

export default Form.create({ name: 'user_login' })(Login);
