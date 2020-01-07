import * as React from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import router from 'umi/router';
import Link from 'umi/link';
import styles from './index.less';
import { StudentLoginForm, TeacherLoginForm } from '@/interfaces/login';
import { USER_TYPE } from '@/enums';
import { usernameToFormFieldName } from '@/models/user';

interface LoginFormProps extends FormComponentProps {
  userType: number;
  dispatch: Dispatch<any>;
  loading: boolean;
}

const LoginForm: React.SFC<LoginFormProps> = ({ form, userType, dispatch }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields((err: Error, values: StudentLoginForm | TeacherLoginForm) => {
      if (err) {
        return;
      }
      delete values.remember;

      dispatch({
        type: 'login/userLogin',
        payload: { userType, values },
      });
    });
  };

  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit} className={styles.loginForm}>
      <Form.Item>
        {getFieldDecorator(usernameToFormFieldName[USER_TYPE[userType]], {
          rules: [{ required: true, message: '请输入' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="学工号"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="密码"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>记住我</Checkbox>)}
        <Link className={styles.forgot} to="/login/forgotPassword">
          忘记密码？
        </Link>
        <Button type="primary" htmlType="submit" className={styles.submit}>
          登录
          </Button>
        <Link to="/login/register">新用户注册</Link>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state: any) => {
  const { userType } = state.login;
  return {
    userType,
    loading: state.loading.models.login,
  };
};

export default Form.create({ name: 'normal_login' })(connect(mapStateToProps)(LoginForm));
