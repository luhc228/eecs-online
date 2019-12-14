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
  formTypes: CUSTOM_FORM_TYPES.TwoColumn | CUSTOM_FORM_TYPES.Filter | CUSTOM_FORM_TYPES.OneColumn;
  layout?: 'horizontal' | 'inline' | 'vertical';
  formConfig: FormItemComponentProps[];
  values: object;
  loading: boolean;
  children?: React.ReactNode;
  onFieldsChange: (allFields: object) => void;
  onSubmit: (value: object) => void;
}

const CustomForm: React.FC<CustomFormProps> = props => {
  const { formTypes, form, formConfig, onSubmit, loading, layout, children } = props;
  const { getFieldDecorator, getFieldValue } = form;

  let formItemLayout: any = null;
  if (formTypes === CUSTOM_FORM_TYPES.Filter) {
    formItemLayout = INLINE_FORM_LAYOUT;
  }
  if (formTypes === CUSTOM_FORM_TYPES.OneColumn) {
    formItemLayout = ONE_COLUMN_FORM_LAYOUT;
  }
  if (formTypes === CUSTOM_FORM_TYPES.TwoColumn) {
    formItemLayout = TWO_COLUMNS_FORM_LAYOUT;
  }

  const renderForm = (formItem: FormItemComponentProps) => {
    switch (formItem.component) {
      case FORM_COMPONENT.Input:
        return (
          <>
            {getFieldDecorator(formItem.name, {
              initialValue: formItem.initialValue,
              rules: [{ required: formItem.required, message: formItem.message ? formItem.message : '请输入' }],
            })(<Input placeholder="请输入" style={{ width: '100%' }} />)}
          </>
        )
      case FORM_COMPONENT.Select:
        return (
          <>
            {getFieldDecorator(formItem.name, {
              initialValue: formItem.initialValue,
            })(
              <Select placeholder="请选择" style={{ width: '100%' }} mode={formItem.selectMode} {...formItem.props}>
                {formItem.datasource &&
                  formItem.datasource.map((item: SelectComponentDatasourceModel) => (
                    <Option value={item.value} key={item.label}>{item.label}</Option>
                  ))}
              </Select>,
            )}
          </>
        )
      case FORM_COMPONENT.InputNumber:
        return (
          <>
            {getFieldDecorator(formItem.name, {
              initialValue: formItem.initialValue,
            },
            )(<InputNumber style={{ width: '100%' }} />)}
          </>
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
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          {formConfig && formConfig.map((formItem: FormItemComponentProps) => (
            <Col {...formItemLayout} key={formItem.name}>
              <Form.Item label={formItem.label}>
                {renderForm(formItem)}
              </Form.Item>
            </Col>
          ))}
        </Row>
        {children}
        <Form.Item>
          {(formTypes === CUSTOM_FORM_TYPES.OneColumn || formTypes === CUSTOM_FORM_TYPES.TwoColumn) && (
            <span className={styles.commonButtons}>
              <Button type="primary" htmlType="submit" loading={loading}>
                保存
          </Button>
              <Button style={{ marginLeft: 15 }} onClick={handleFormReset}>
                取消
          </Button>
            </span>)}
          {(formTypes === CUSTOM_FORM_TYPES.Filter) && (
            <span className={styles.filterButtons}>
              <Button type="primary" htmlType="submit" loading={loading}>
                查询
          </Button>
              <Button style={{ marginLeft: 15 }} onClick={handleFormReset}>
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
  // ref: http://react-component.github.io/form/examples/redux.html
  mapPropsToFields(props: CustomFormProps) {
    const result: { [key: string]: { value: string | number | string[], [key: string]: any } } = {};

    if (props.values) {
      Object.entries(props.values).forEach(formField => {
        const [key, field] = formField;
        result[key] = Form.createFormField({
          value: field,
        });
      });
    }

    return result;
  },

  onFieldsChange(props: CustomFormProps, _: any, allFields: object) {
    const result: { [key: string]: any } = {}
    if (allFields) {
      Object.entries(allFields).forEach(formField => {
        const [key, field] = formField;
        result[key] = field.value;
      });
    }
    props.onFieldsChange(result);
  },
})(CustomForm);
