import * as React from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import router from 'umi/router';
import styles from './index.less';
import { StudentLoginForm, TeacherLoginForm } from '@/interfaces/login';
import { USER_TYPE } from '@/enums';
import { usernameToFormFieldName } from '@/models/user';

interface LoginFormProps extends FormComponentProps {
  userType: number;
  dispatch: Dispatch<any>;
  loading: boolean;
}

const LoginForm: React.SFC<LoginFormProps> = ({ form, userType, loading, dispatch }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields((err: Error, values: StudentLoginForm | TeacherLoginForm) => {
      if (err) {
      } else {
        //   dispatch({
        //     type: 'login/userLogin',
        //     payload: { userType, values },
        //   });
        // }
        delete values.remember;

        dispatch({
          type: 'login/userLogin',
          payload: { userType, values },
        });
      }
    });
  };

  const handleRegister = () => {
    dispatch({
      type: 'login/userRegister',
      payload: {},
    });
    router.push('/login/register');
  };

  const handleFogotPassword = () => {
    dispatch({
      type: 'login/userFogotPassword',
      payload: {},
    });
    router.push('/login/forgotPassword');
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
            placeholder="Username"
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
            placeholder="Password"
          />,
        )}
      </Form.Item>
      <Form.Item className={styles.check}>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>Remember me</Checkbox>)}
      </Form.Item>
      <Form.Item>
        <a className={styles.register} onClick={handleRegister}>
          用户注册
        </a>
        <a className={styles.forgot} onClick={handleFogotPassword}>
          忘记密码
        </a>
        <Button loading={loading} type="primary" htmlType="submit" className={styles.submit}>
          登录
        </Button>
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
