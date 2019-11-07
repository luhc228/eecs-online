import * as React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.less';

interface LoginFormProps {
  form: any;
}

const LoginForm: React.SFC<LoginFormProps> = ({
  form
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit} className={styles.loginForm}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
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
        <Button type="primary" htmlType="submit" className={styles.submit}>
          登　录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Form.create({ name: 'normal_login' })(LoginForm);
