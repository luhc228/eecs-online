import React from 'react';
import { connect } from 'dva';
import CustomForm from '@/components/CustomForm';
import { CUSTOM_FORM_TYPES, FORM_COMPONENT } from '@/enums';
import { FormItemComponentProps } from '@/interfaces/components';
import { questionTypeMap } from '../questionLib';
import appConfig from '@/appConfig';

const QuestionLibEdit: React.FC<{}> = () => {
  const handleQuestionTypeChange = () => {
    console.log('ff');
  };

  const optFormConfig: FormItemComponentProps[] = [
    {
      label: '选项A',
      name: 'optionA',
      component: FORM_COMPONENT.Input,
      required: false,
    },
    {
      label: '选项B',
      name: 'optionB',
      component: FORM_COMPONENT.Input,
      required: false,
    },
    {
      label: '选项C',
      name: 'optionC',
      component: FORM_COMPONENT.Input,
      required: false,
    },
    {
      label: '选项D',
      name: 'optionD',
      component: FORM_COMPONENT.Input,
      required: false,
    }
  ];

  const formConfig: FormItemComponentProps[] = [
    {
      label: '所属课程',
      name: 'courseId',
      component: FORM_COMPONENT.Select,
      required: true,
      // TODO: from backend api
      datasource: [
        {
          value: '通信1班',
          label: '通信1班',
        },
      ],
    },
    {
      label: '题目内容',
      name: 'content',
      component: FORM_COMPONENT.TextArea,
      required: true,
    },
    {
      label: '题目类型',
      name: 'questionType',
      component: FORM_COMPONENT.Select,
      required: true,
      datasource: Object.entries(questionTypeMap).map((item) => {
        const [value, label] = item;
        return {
          value,
          label,
        }
      }),
      props: {
        onChange: handleQuestionTypeChange,
      }
    },
    {
      label: '题目图片',
      name: 'contentImage',
      component: FORM_COMPONENT.Upload,
      required: false,
      props: {
        name: 'file',
        multiple: true,
        action: appConfig.uploadUrl,
      }
    },
    {
      label: '题目分值',
      name: 'questionScore',
      component: FORM_COMPONENT.InputNumber,
      required: true,
      props: {
        unit: '分'
      }
    },
  ]

  const handleFieldsChange = () => {

  }

  const handleSubmit = () => {

  }

  return (
    <CustomForm
      layout="horizontal"
      values={{}}
      formTypes={CUSTOM_FORM_TYPES.OneColumn}
      loading={false}
      onFieldsChange={handleFieldsChange}
      formConfig={formConfig}
      onSubmit={handleSubmit}
    />
  )
}
// const mapStateToProps = ({
//   questionLib
// }: {
//   questionLib: StateType
// }) => ({
//   questionLib
// });

export default connect()(QuestionLibEdit);
