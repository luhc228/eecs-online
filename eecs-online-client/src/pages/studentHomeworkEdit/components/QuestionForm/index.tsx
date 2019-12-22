import React from 'react';
import CustomForm from '@/components/CustomForm';
import { CUSTOM_FORM_TYPES, FORM_COMPONENT } from '@/enums';

const QuestionForm: React.FC<{}> = () => {
  const getFormConfig = () => [
    {
      label: '【单选题】',
      name: 'single',
      component: FORM_COMPONENT.Radio,
      required: false,
      // TODO: from backend api
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
