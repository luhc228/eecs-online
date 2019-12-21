/**
 * CustomForm component including filter/common form
 * Filter component usually in the header of the table or the page.
 */
import React, { useState } from 'react';
import { Form, Row, Col, Input, Select, Button, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import { FormItemComponentProps, SelectComponentDatasourceModel } from '@/interfaces/components';
import { TWO_COLUMNS_FORM_LAYOUT, INLINE_FORM_LAYOUT, ONE_COLUMN_FORM_LAYOUT } from '@/constants';
import styles from './index.less';
import InputNumberWithUnit from '../InputNumberWithUnit';
import ImageUpload from '../upload/ImageUpload';

const { Option } = Select;
const { TextArea } = Input;
interface CustomFormProps extends FormComponentProps {
  formTypes: CUSTOM_FORM_TYPES;
  layout?: 'horizontal' | 'inline' | 'vertical';
  formConfig: FormItemComponentProps[];
  values: object;
  loading: boolean;
  children?: React.ReactNode;
  onFieldsChange: (allFields: object) => void;
  onSubmit: (value: object) => void;
}

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};


const CustomForm: React.FC<CustomFormProps> = props => {
  const { formTypes, form, formConfig, onSubmit, loading, layout, children } = props;
  const { getFieldDecorator, getFieldValue } = form;

  const [fieldSetId, changeFieldSetId] = useState(1);

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

  const handleDynamicFieldSetRemove = (k: string) => {
    const keys = form.getFieldValue('keys');
    // need at least one input
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter((key: string) => key !== k),
    });
  }

  /**
   * 动态增加表单项
   * @param fieldName 字段名称
   */
  const handleDynamicFieldSetAdd = () => {
    const keys = form.getFieldValue('keys');
    const newFieldSetId = fieldSetId + 1;
    changeFieldSetId(newFieldSetId)
    const nextKeys = keys.concat(fieldSetId);

    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  const renderDynamicFieldSetFormItems = () => {
    getFieldDecorator('keys', { initialValue: [{}] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k: string) => (
      <Form.Item
        {...formItemLayoutWithOutLabel}
        label=""
        required={false}
        key={k}
      >
        {getFieldDecorator(`field[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: false,
              whitespace: true,
              message: '请输入',
            },
          ],
        })(<Input placeholder="请输入" style={{ width: '60%', marginRight: 8 }} />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => handleDynamicFieldSetRemove(k)}
          />
        ) : null}
      </Form.Item>
    ))

    return formItems;
  }

  const renderDynamicFieldSet = () => (
    <>
      {renderDynamicFieldSetFormItems()}
      <Form.Item>
        <Button
          type="dashed"
          onClick={() => handleDynamicFieldSetAdd()}
          style={{ width: '100%' }}>
          <Icon type="plus" />添加
        </Button>
      </Form.Item>
    </>
  )

  const renderForm = (formItem: FormItemComponentProps) => {
    switch (formItem.component) {
      case FORM_COMPONENT.Input:
        return (
          <>
            {getFieldDecorator(formItem.name, {
              initialValue: formItem.initialValue,
              rules: [{
                required: formItem.required,
                message: formItem.message ? formItem.message : '请输入'
              }],
            })(
              <Input
                placeholder="请输入"
                style={{ width: '100%' }}
                {...formItem.props}
              />)}
          </>
        )
      case FORM_COMPONENT.Select:
        return (
          <>
            {getFieldDecorator(formItem.name, {
              initialValue: formItem.initialValue,
              rules: [{
                required: formItem.required,
                message: formItem.message ? formItem.message : '请选择'
              }],
            })(
              <Select
                placeholder="请选择"
                {...formItem.props}
              >
                {formItem.datasource &&
                  formItem.datasource.map((item: SelectComponentDatasourceModel) => (
                    <Option value={item.value} key={item.label}>{item.label}</Option>
                  ))}
              </Select>,
            )}
          </>
        )
      case FORM_COMPONENT.DynamicFieldSet:
        return (
          <>
            {getFieldDecorator(formItem.name, {
              initialValue: formItem.initialValue,
              rules: [{
                required: formItem.required,
                message: formItem.message ? formItem.message : '请输入'
              }],
            },
            )(
              <>
                {renderDynamicFieldSet()}
              </>
            )}
          </>
        )
      case FORM_COMPONENT.Upload:
        return (
          <>
            {getFieldDecorator(formItem.name, {
              initialValue: formItem.initialValue,
              valuePropName: 'fileList',
              rules: [{
                required: formItem.required,
                message: formItem.message ? formItem.message : '请上传',
              }],
            },
            )(
              <ImageUpload {...formItem.props} />
            )}
          </>
        )
      case FORM_COMPONENT.InputNumber:
        return (
          <>
            {getFieldDecorator(formItem.name, {
              initialValue: formItem.initialValue,
              rules: [{
                required: formItem.required,
                message: formItem.message ? formItem.message : '请输入'
              }],
            },
            )(
              <InputNumberWithUnit {...formItem.props} />
            )}
          </>
        )
      case FORM_COMPONENT.TextArea:
        return (
          <>
            {getFieldDecorator(formItem.name, {
              initialValue: formItem.initialValue,
              rules: [{
                required: formItem.required,
                message: formItem.message ? formItem.message : '请输入'
              }],
            },
            )(
              <TextArea
                style={{ minHeight: 32 }}
                placeholder="请输入"
                rows={4}
                {...formItem.props}
              />
            )}
          </>
        )
      default:
        return null;
    }
  }


  const submitHandler = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      onSubmit(values);
    });
  }

  const handleFormReset = () => {
    props.form.resetFields();
    props.onSubmit({});
  }

  const filterFormButtons = (buttonsStyles?: string) => (
    <span className={buttonsStyles && styles[buttonsStyles]}>
      <Button type="primary" htmlType="submit" loading={loading}>
        查询
      </Button>
      <Button style={{ marginLeft: 15 }} onClick={handleFormReset}>
        重置
      </Button>
    </span>
  )

  const commonFormButtons = (
    <span className={styles.commonButtons}>
      <Button type="primary" htmlType="submit" loading={loading}>
        保存
     </Button>
      <Button style={{ marginLeft: 15 }} onClick={handleFormReset}>
        取消
    </Button>
    </span>
  )

  return (
    <div className={formTypes === CUSTOM_FORM_TYPES.Filter ? styles.tableListForm : undefined}>
      <Form onSubmit={submitHandler} layout={layout}>
        {/* 筛选表单时使用Row组件 */}
        {formTypes === CUSTOM_FORM_TYPES.Filter &&
          <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
            {formConfig && formConfig.map((formItem: FormItemComponentProps) => (
              <Col {...formItemLayout} key={formItem.name}>
                <Form.Item label={formItem.label}>
                  {renderForm(formItem)}
                </Form.Item>
              </Col>
            ))}
            {formConfig &&
              formTypes === CUSTOM_FORM_TYPES.Filter &&
              formConfig.length % (24 / INLINE_FORM_LAYOUT.md) !== 0 && (
                <Col {...formItemLayout}>
                  <Form.Item>
                    {filterFormButtons()}
                  </Form.Item>
                </Col>
              )}
          </Row>
        }
        {/* 普通表单 */}
        {(formTypes === CUSTOM_FORM_TYPES.OneColumn || formTypes === CUSTOM_FORM_TYPES.TwoColumn) &&
          formConfig && formConfig.map((formItem: FormItemComponentProps) => (
            <Form.Item label={formItem.label} key={formItem.name} {...formItemLayout}>
              {renderForm(formItem)}
            </Form.Item>
          ))
        }
        {children}
        <Form.Item>
          {(formTypes === CUSTOM_FORM_TYPES.OneColumn ||
            formTypes === CUSTOM_FORM_TYPES.TwoColumn) && (
              <>{commonFormButtons}</>
            )}
          {(formTypes === CUSTOM_FORM_TYPES.Filter) &&
            formConfig.length % (24 / INLINE_FORM_LAYOUT.md) === 0 && (
              <>{filterFormButtons('filterFloatRightButtons')}</>
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
