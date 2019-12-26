/**
 * CustomForm component including filter/common form
 * Filter component usually in the header of the table or the page.
 */
import React from 'react';
import { Form, Row, Col, Upload, Icon, Input, Select, Button, Radio, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import { FormItemComponentProps, SelectComponentDatasourceModel } from '@/interfaces/components';
import { TWO_COLUMNS_FORM_LAYOUT, INLINE_FORM_LAYOUT, ONE_COLUMN_FORM_LAYOUT } from '@/constants';
import styles from './index.less';
import InputNumberWithUnit from '../InputNumberWithUnit';
import ImageUpload from '../upload/ImageUpload';
import CodeEditor from '../CodeEditor';
import DynamicFieldSet from '../DynamicFieldSet';

const { Option } = Select;
const { TextArea } = Input;
interface CustomFormProps extends FormComponentProps {
  formTypes: CUSTOM_FORM_TYPES;
  layout?: 'horizontal' | 'inline' | 'vertical';
  formConfig: FormItemComponentProps[];
  values: object;
  loading?: boolean;
  children?: React.ReactNode;
  onFieldsChange: (allFields: object) => void;
  onSubmit: (value: object) => void;
  resetFieldsVisible?: boolean;
}

const CustomForm: React.FC<CustomFormProps> = props => {
  const { formTypes, form, formConfig, onSubmit, loading, layout, children, resetFieldsVisible } = props;
  const { getFieldDecorator } = form;

  let formItemLayout: any = null;
  if (formTypes === CUSTOM_FORM_TYPES.Filter) {
    formItemLayout = INLINE_FORM_LAYOUT;
  }
  if (formTypes === CUSTOM_FORM_TYPES.OneColumn && layout !== 'vertical') {
    formItemLayout = ONE_COLUMN_FORM_LAYOUT;
  }
  if (formTypes === CUSTOM_FORM_TYPES.TwoColumn && layout !== 'vertical') {
    formItemLayout = TWO_COLUMNS_FORM_LAYOUT;
  }

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
              <DynamicFieldSet {...formItem.props} />
            )}
          </>
        )
      case FORM_COMPONENT.Upload:
        return (
          <>
            {getFieldDecorator(formItem.name, {
              initialValue: formItem.initialValue,
              valuePropName: 'fileList',
              getValueFromEvent: e => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              },
              rules: [{
                required: formItem.required,
                message: formItem.message ? formItem.message : '请上传',
              }],
            },
            )(
              <ImageUpload {...formItem.props} />
              // <Upload name="logo" action="/upload.do" listType="picture">
              //   <Button>
              //     <Icon type="upload" /> Click to upload
              // </Button>
              // </Upload>
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
      case FORM_COMPONENT.Radio:
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
              <Radio.Group {...formItem.props}>
                {formItem.datasource &&
                  formItem.datasource.map((item: SelectComponentDatasourceModel) => (
                    <Radio style={{
                      display: 'block',
                      height: '30px',
                      lineHeight: '30px',
                    }} value={item.value} key={item.label}>{item.label}</Radio>
                  ))}
              </Radio.Group>
            )}
          </>
        )
      case FORM_COMPONENT.Checkbox:
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
              <Checkbox.Group
                className={styles.checkboxInRow}
                options={formItem.datasource}
              />
            )}
          </>
        )
      case FORM_COMPONENT.CodeEditor:
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
              <CodeEditor />
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
        console.log('Received values of form: ', values);
        return;
      }

      onSubmit(values);
    });
  }

  const handleFormReset = () => {
    props.form.resetFields();
    props.onSubmit({});
  }

  const filterFormButtons = (buttonsStyles?: string, resetVisible: boolean = true) => (
    <span className={buttonsStyles && styles[buttonsStyles]}>
      <Button type="primary" htmlType="submit" loading={loading}>
        查询
      </Button>
      {resetVisible && (
        <Button style={{ marginLeft: 15 }} onClick={handleFormReset}>
          重置
        </Button>
      )}
    </span>
  )

  const commonFormButtons = (
    <span className={styles.commonButtons}>
      <Button onClick={handleFormReset}>
        取消
    </Button>
      <Button
        style={{ marginLeft: 15 }}
        type="primary"
        htmlType="submit"
        loading={loading}>
        保存
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
                    {filterFormButtons(undefined, resetFieldsVisible)}
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
              <>{filterFormButtons('filterFloatRightButtons', resetFieldsVisible)}</>
            )}
        </Form.Item>
      </Form>
    </div>

  )
}

CustomForm.defaultProps = {
  layout: 'inline',
  loading: false,
  resetFieldsVisible: true,
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
