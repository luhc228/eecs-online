/**
 * CustomForm component including filter/common form
 * Filter component usually in the header of the table or the page.
 */
import React from 'react';
import { Form, Row, Col, Input, Select, InputNumber, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import { FormItemComponentProps, SelectComponentDatasourceModel } from '@/interfaces/components';
import { TWO_COLUMNS_FORM_LAYOUT, INLINE_FORM_LAYOUT, ONE_COLUMN_FORM_LAYOUT } from '@/constants';
import styles from './index.less';

const { Option } = Select;

interface CustomFormProps extends FormComponentProps {
  formTypes: CUSTOM_FORM_TYPES.Common | CUSTOM_FORM_TYPES.Filter;
  layout?: 'horizontal' | 'inline' | 'vertical';
  formConfig: FormItemComponentProps[];
  values: object;
  loading: boolean;
  onFieldsChange: (allFields: object) => void;
  onSubmit: (value: object) => void;
}

const CustomForm: React.FC<CustomFormProps> = props => {
  const { formTypes, form, formConfig, onSubmit, loading, layout } = props;
  const { getFieldDecorator } = form;

  let formItemLayout: any = null;
  if (formTypes === CUSTOM_FORM_TYPES.Filter) {
    formItemLayout = INLINE_FORM_LAYOUT;
  }
  if (formTypes === CUSTOM_FORM_TYPES.Common) {
    formItemLayout = ONE_COLUMN_FORM_LAYOUT;
  }

  const renderForm = (formItem: FormItemComponentProps) => {
    switch (formItem.component) {
      case FORM_COMPONENT.Input:
        return (
          <Form.Item label={formItem.label}>
            {getFieldDecorator(formItem.name, {
              initialValue: formItem.initialValue,
            })(<Input placeholder="请输入" />)}
          </Form.Item>
        )
      case FORM_COMPONENT.Select:
        return (
          <Form.Item label={formItem.label}>
            {getFieldDecorator(formItem.name, {
              initialValue: formItem.initialValue,
            })(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                {formItem.datasource &&
                  formItem.datasource.map((item: SelectComponentDatasourceModel) => (
                    <Option value={item.value} key={item.label}>{item.label}</Option>
                  ))}
              </Select>,
            )}
          </Form.Item>
        )
      case FORM_COMPONENT.InputNumber:
        return (
          <Form.Item label={formItem.label}>
            {getFieldDecorator(formItem.name, {
              initialValue: formItem.initialValue,
            },
            )(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        )
      default:
        return null;
    }
  }


  const submitHandler = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      onSubmit(values);
    });
  }

  const handleFormReset = () => {
    props.form.resetFields();
    props.onSubmit({});
  }
  return (
    <div className={styles.tableListForm}>
      <Form onSubmit={submitHandler} layout={layout}>
        {/* <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {formConfig && formConfig.map((formItem: FormItemComponentProps) => (
            <Col md={8} sm={24} key={formItem.name}>
              {renderForm(formItem)}
            </Col>
          ))}
        </Row> */}

        {/* <Row>
          <span className={styles.submitButtons}>
            <Button type="primary" htmlType="submit" loading={loading}>
              查询
          </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleFormReset}>
              重置
          </Button>
          </span>
        </Row> */}
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          {formConfig && formConfig.map((formItem: FormItemComponentProps) => (
            <Col {...formItemLayout} key={formItem.name}>
              {renderForm(formItem)}
            </Col>
          ))}
        </Row>
        {/* <Form.Item>
          <span className={styles.filterButtons}>
            <Button type="primary" htmlType="submit" loading={loading}>
              查询
          </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleFormReset}>
              重置
          </Button>
          </span>
        </Form.Item> */}
        <Form.Item>
          {(formTypes === CUSTOM_FORM_TYPES.Common) && (
            <span className={styles.commonButtons}>
              <Button type="primary" htmlType="submit" loading={loading}>
                保存
          </Button>
              <Button style={{ marginLeft: 8 }} onClick={handleFormReset}>
                取消
          </Button>
            </span>)}
          {(formTypes === CUSTOM_FORM_TYPES.Filter) && (
            <span className={styles.filterButtons}>
              <Button type="primary" htmlType="submit" loading={loading}>
                查询
          </Button>
              <Button style={{ marginLeft: 8 }} onClick={handleFormReset}>
                重置
          </Button>
            </span>
          )}
        </Form.Item>
      </Form>
    </div>

  )
}

CustomForm.defaultProps = {
  layout: 'inline',
}

export default Form.create<CustomFormProps>({
  mapPropsToFields(props: CustomFormProps) {
    const result: { [key: string]: string | number; } = {};

    if (props.values) {
      Object.entries(props.values).forEach(formField => {
        const [key, field] = formField;
        result[key] = Form.createFormField(field);
      });
    }

    return result;
  },
  onFieldsChange(props: CustomFormProps, _: any, allFields: object) {
    props.onFieldsChange(allFields);
  },
})(CustomForm);
