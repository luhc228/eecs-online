import React, { useState } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch } from 'redux';
import router from 'umi/router';
import { StudentPasswordForm, TeacherPasswordForm } from '@/interfaces/passwordEdit';
import styles from './EditForm.less';
import { USER_TYPE } from '@/enums';
import userUtils from '@/utils/user-utils';

interface PasswordProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  submitting: boolean;
}

const PasswordEditForm: React.FC<PasswordProps> = ({ form, submitting, dispatch }) => {
  const [confirmDirty, setconfirmDirty] = useState(false);

  const { userType } = userUtils.getUserInfo();
  console.log('userInfo', userUtils.getUserInfo());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields((err: Error, values: StudentPasswordForm | TeacherPasswordForm) => {
      if (!err) {
        console.log('values', values);
        if (userType === USER_TYPE.Student) {
          dispatch({
            type: 'passwordEdit/userPasswordEdit',
            payload: {
              userType,
              values: {
                password: values.password,
                studentId: userUtils.getUserInfo().studentId,
              },
            },
          });
          router.goBack();
        }
        if (userType === USER_TYPE.Teacher) {
          dispatch({
            type: 'passwordEdit/userPasswordEdit',
            payload: {
              userType,
              values: {
                password: values.password,
                studentId: userUtils.getUserInfo().teacherId,
              },
            },
          });
          router.goBack();
        }
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

  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit} className={styles.passwordForm}>
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
          确 认 修 改
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.loading.models.passwordEdit,
});
export default Form.create({ name: 'passwordEdit_form' })(
  connect(mapStateToProps)(PasswordEditForm),
);
