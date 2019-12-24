import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Dispatch } from 'redux';
import { Input, Form, Select } from 'antd';
import { connect } from 'dva';
import Button from 'antd/es/button/button';
import router from 'umi/router';
import { TeacherUserForm } from '@/interfaces/teacherInfo';
import styles from './index.less';

const { Option } = Select;

// interface SelectItem {
//     label: string;
//     key: string;
//   }

interface TeacherUserProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  user: TeacherUserForm;
}

const TeacherUserInfo: React.FC<TeacherUserProps> = ({ form, dispatch, user }) => {
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    form.validateFields(err => {
      if (!err) {
        dispatch({
          type: 'userInfo/updateInfo',
          payload: { user },
        });
        router.goBack();
      }
    });
  };

  // const validatorCollege = (
  //     _: any,
  //     value: {
  //         college: SelectItem;
  //     },
  //     callback: (message?: string) => void,
  // ) => {
  //     const { college } = value;
  //     if (!college.key) {
  //         callback('请选择学院！');
  //     }
  //     callback();
  // };

  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit} className={styles.userInfo}>
      <Form.Item label=" 用 户 名 ">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '用户名不可为空' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label=" 账 号 ">
        {getFieldDecorator('id', {
          rules: [{ required: true, message: '账号不可为空' }],
        })(<Input disabled />)}
      </Form.Item>
      <Form.Item label=" 性 别 ">
        {getFieldDecorator('gender', {
          rules: [{ required: true, message: '请选择性别' }],
        })(
          <Select>
            <Option value="female">女</Option>
            <Option value="male">男</Option>
          </Select>,
        )}
      </Form.Item>
      <Form.Item label=" 学 院 ">
        {getFieldDecorator('college', {
          rules: [
            { required: true, message: '请选择学院 / 班级' },
            // { validator: { validatorCollege } }
          ],
        })(
          <Select>
            <Option value={0}>信息学院</Option>
            <Option value={2}>计算机学院</Option>
          </Select>,
        )}
      </Form.Item>
      <Button type="primary" htmlType="submit" className={styles.submit}>
        保 存
      </Button>
    </Form>
  );
};

const mapStateToProps = (state: any) => {
  const { currentuser } = state.user;
  return {
    currentuser,
    loading: state.loading.models.studentInfo,
  };
};
export default Form.create({ name: 'teacherInfo' })(connect(mapStateToProps)(TeacherUserInfo));
