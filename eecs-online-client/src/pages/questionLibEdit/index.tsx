import React, { useState } from 'react';
import { connect } from 'dva';
import CustomForm from '@/components/CustomForm';
import { CUSTOM_FORM_TYPES, FORM_COMPONENT, QUESTION_TYPE } from '@/enums';
import { FormItemComponentProps } from '@/interfaces/components';
import { questionTypeMap } from '../questionLib';
import appConfig from '@/appConfig';

const QuestionLibEdit: React.FC<{}> = () => {
  const [isOptionsDisplay, setIsOptionsDisplay] = useState(false);

  const getFormConfig = (optionsDisplay: boolean): FormItemComponentProps[] => {
    const basicFormConfig = [{
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
    },
    {
      label: '选项',
      name: 'options',
      component: FORM_COMPONENT.DynamicFieldSet,
      required: true,
      initialValue: [],
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
    }];
    if (optionsDisplay) {
      return basicFormConfig;
    }
    basicFormConfig.splice(3, 1);
    return basicFormConfig;
  };

  const handleFieldsChange = (values: any) => {
    const { questionType } = values;
    if (+questionType === QUESTION_TYPE.Single || +questionType === QUESTION_TYPE.Multiple) {
      setIsOptionsDisplay(true);
    } else {
      setIsOptionsDisplay(false);
    }
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
      formConfig={getFormConfig(isOptionsDisplay)}
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
