import * as React from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import styles from './index.less';
import { StudentLoginForm, TeacherLoginForm } from '@/interfaces/login';

interface LoginFormProps extends FormComponentProps {
  userType: number;
  dispatch: Dispatch<any>;
  loading: boolean;
}

const LoginForm: React.SFC<LoginFormProps> = ({
  form,
  userType,
  loading,
  dispatch,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields((err: any, values: StudentLoginForm | TeacherLoginForm) => {
      if (err) {
        return;
      }
      dispatch({
        type: 'login/userLogin',
        payload: { userType, values },
      })
    });
  };

  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit} className={styles.loginForm}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>Remember me</Checkbox>)}
        <Button loading={loading} type="primary" htmlType="submit" className={styles.submit}>
          登　录
        </Button>
      </Form.Item>
    </Form>
  )
}

const mapStateToProps = (state: any) => {
  const { userType } = state.login;
  return {
    userType,
    loading: state.loading.models.login,
  }
}

export default Form.create({ name: 'normal_login' })(connect(mapStateToProps)(LoginForm));
