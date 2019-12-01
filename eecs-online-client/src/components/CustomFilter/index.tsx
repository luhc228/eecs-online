/**
 * Filter component usually in the header of the table or the page.
 */
import React from 'react';
import { Form, Row, Col, Input, Select, InputNumber, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { FORM_COMPONENT } from '@/enums';
import styles from './index.less';

const { Option } = Select;

interface CustomFilterProps extends FormComponentProps {
  onSubmit: (value: object) => void;
}

const CustomFilter: React.FC<CustomFilterProps> = props => {
  const { form } = props;
  const { getFieldDecorator } = form;

  const renderForm = (formItem: any) => {
    switch (formItem.component) {
      case FORM_COMPONENT.Input:
        return (
          <Form.Item label="规则名称">
            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
          </Form.Item>
        )
      case FORM_COMPONENT.Select:
        return (
          <Form.Item label="使用状态">
            {getFieldDecorator('status')(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Option value="0">关闭</Option>
                <Option value="1">运行中</Option>
              </Select>,
            )}
          </Form.Item>
        )
      case FORM_COMPONENT.InputNumber:
        return (
          <Form.Item label="调用次数">
            {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        )
      default:
        return null;
    }
    // if (formItem.component === 'Input') {
    //   return (
    //     <Form.Item label="规则名称">
    //       {getFieldDecorator('name')(<Input placeholder="请输入" />)}
    //     </Form.Item>
    //   )
    // }
    // if (formItem.component === 'Select') {
    //   return renderSelect(item);
    // }
    // if (item.component === 'NumberRange') {
    //   return renderNumberRange(item);
    // }
    // return null;
  }


  const submitHandler = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      props.onSubmit(values);
    });
  }

  const handleFormReset = () => {
    props.form.resetFields();
    props.onSubmit({});
  }
  return (
    <div className={styles.tableListForm}>
      <Form onSubmit={submitHandler} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="规则名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="调用次数">
              {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="调用次数">
              {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
            </Form.Item>
          </Col>
        </Row>
        <span className={styles.submitButtons}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleFormReset}>
            重置
          </Button>
        </span>
      </Form>
    </div>

  )
}

export default Form.create<CustomFilterProps>()(CustomFilter);
