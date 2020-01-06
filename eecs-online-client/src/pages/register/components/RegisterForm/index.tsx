import React, { useState } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch } from 'redux';
import router from 'umi/router';
import { StudentRegisterForm, TeacherRegisterForm } from '@/interfaces/register';
import styles from './index.less';
import { USER_TYPE } from '@/enums';

interface RegisterProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  submitting: boolean;
  userType: number;
}

const RegisterForm: React.FC<RegisterProps> = ({ form, userType, submitting, dispatch }) => {
  const [confirmDirty, setconfirmDirty] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields((err: Error, values: StudentRegisterForm | TeacherRegisterForm) => {
      if (!err) {
        dispatch({
          type: 'register/userRegister',
          payload: { userType, values },
        });
        router.goBack();
      }
    });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setconfirmDirty(confirmDirty || !!value);
  };

  const validateToNextPassword = (rule: any, value: any, callback: any) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const compareToFirstPassword = (rule: any, value: any, callback: any) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不同！');
    } else {
      callback();
    }
  };

  const userLogin = () => {
    router.push('/login');
  };

  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit} className={styles.registerForm}>
      <Form.Item>
        {getFieldDecorator(userType === USER_TYPE.Student ? 'studentName' : 'teacherName', {
          rules: [{ required: true, message: '请输入姓名' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator(userType === USER_TYPE.Student ? 'studentId' : 'teacherId', {
          rules: [{ required: true, message: '请输入学工号' }],
        })(
          <Input
            prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Id"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码' }, { validator: validateToNextPassword }],
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('confirm', {
          rules: [
            { required: true, message: '请再次输入确认密码' },
            { validator: compareToFirstPassword },
          ],
        })(
          <Input.Password
            onBlur={handleConfirmBlur}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Password confirm"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button loading={submitting} type="primary" htmlType="submit" className={styles.submit}>
          注 册
        </Button>
        <a className={styles.login} onClick={userLogin}>
          前往登录
        </a>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state: any) => {
  const { userType } = state.register;
  return {
    userType,
    loading: state.loading.models.register,
  };
};
export default Form.create({ name: 'register_form' })(connect(mapStateToProps)(RegisterForm));
