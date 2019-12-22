import React from 'react';
import CustomForm from '@/components/CustomForm';
import { CUSTOM_FORM_TYPES, FORM_COMPONENT } from '@/enums';
import { FormItemComponentProps } from '@/interfaces/components';

const QuestionForm: React.FC<{}> = () => {
  const getFormConfig = (): FormItemComponentProps[] => [
    {
      label: '【编程题】使用python实现反转二叉树',
      name: 'program',
      component: FORM_COMPONENT.CodeEditor,
      // initialValue: '',
      required: false,
    },
    {
      label: '【单选题】以下哪个是正确的选项',
      name: 'single',
      component: FORM_COMPONENT.Radio,
      required: false,
      datasource: [
        {
          value: '0',
          label: 'A、111111',
        },
        {
          value: '1',
          label: 'B、22222',
        },
        {
          value: '2',
          label: 'C、33333',
        },
        {
          value: '3',
          label: 'D、44444',
        },
      ],
    },
    {
      label: '【多选题】以下哪个是错误的选项',
      name: 'multiple',
      component: FORM_COMPONENT.Checkbox,
      required: false,
      datasource: [
        {
          value: '0',
          label: 'A、111111',
        },
        {
          value: '1',
          label: 'B、22222',
        },
        {
          value: '2',
          label: 'C、33333',
        },
        {
          value: '3',
          label: 'D、44444',
        },
      ],
    },
    {
      label: '【判断题】以下哪个是错误的选项',
      name: 'judge',
      component: FORM_COMPONENT.Radio,
      required: false,
      datasource: [
        {
          value: '0',
          label: '正确',
        },
        {
          value: '1',
          label: '错误',
        },
      ],
    },

  ]
  const handleFieldsChange = () => {

  }

  const handleSubmit = () => {

  }

  return (
    <CustomForm
      layout="vertical"
      values={{}}
      formTypes={CUSTOM_FORM_TYPES.OneColumn}
      onFieldsChange={handleFieldsChange}
      formConfig={getFormConfig()}
      onSubmit={handleSubmit}
    />
  )
}

export default QuestionForm;
