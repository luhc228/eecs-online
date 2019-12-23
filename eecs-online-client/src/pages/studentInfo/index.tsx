import React, { Dispatch, useEffect } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { Form, Input, Select } from 'antd';
import Button from 'antd/es/button/button';
import { connect } from 'dva';
import styles from './index.less';
import { StudentUserForm } from '@/interfaces/studentInfo';
import CollegeClassView from './components';

const { Option } = Select;

interface SelectItem {
  label: string;
  key: string;
}

interface StudentUserProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  user: StudentUserForm;
}

const validatorCollegeClass = (
  _: any,
  value: {
    college: SelectItem;
    studentClass: SelectItem;
  },
  callback: (message?: string) => void,
) => {
  const { college, studentClass } = value;
  if (!college.key) {
    callback('请选择学院！');
  }
  if (!studentClass.key) {
    callback('请选择班级！');
  }
  callback();
};

const StudentUserInfo: React.FC<StudentUserProps> = ({ form, user, dispatch }) => {
  // const [currentUser] = useState(undefined)
  useEffect(() => {
    dispatch({
      type: 'userInfo/fetchCurrent',
      payload: { ...StudentUserInfo },
    });
  }, []);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    form.validateFields(err => {
      if (!err) {
        dispatch({
          type: 'userInfo/changeUserInfo',
          payload: { user },
        });
      }
    });
  };

  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label="UserName">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '修改用户名于此处' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Id">
        {getFieldDecorator('id', {
          rules: [{ required: true, message: '修改账号于此处' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="gender">
        {getFieldDecorator('gender', {
          rules: [{ required: true, message: '请选择性别' }],
        })(
          <Select>
            <Option value="female">女</Option>
            <Option value="male">男</Option>
          </Select>,
        )}
      </Form.Item>
      <Form.Item label="学院 / 班级">
        {getFieldDecorator('collegeClass', {
          rules: [
            { required: true, message: '请选择学院 / 班级' },
            { validator: validatorCollegeClass },
          ],
        })(<CollegeClassView />)}
      </Form.Item>
      <Button type="primary" htmlType="submit" className={styles.submit}>
        保 存
      </Button>
    </Form>
  );
};

const mapStateToProps = (state: any) => {
  const { user } = state.user;
  return {
    user,
    loading: state.loading.models.studentInfo,
  };
};
export default Form.create({ name: 'studentInfo' })(connect(mapStateToProps)(StudentUserInfo));
