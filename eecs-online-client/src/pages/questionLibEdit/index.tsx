import React, { useState } from 'react';
import { connect } from 'dva';
import CustomForm from '@/components/CustomForm';
import { CUSTOM_FORM_TYPES, FORM_COMPONENT, QUESTION_TYPE } from '@/enums';
import { FormItemComponentProps, UmiComponentProps } from '@/interfaces/components';
import { questionTypeMap } from '../questionLib';
import appConfig from '@/appConfig';
import CustomCard from '@/components/CustomCard';
import { StateType } from './models';
import RouterPrompt from '@/components/RouterPrompt';

export interface QuestionLibEditProps extends UmiComponentProps {
  loading: boolean;
  questionLibEdit: StateType;
}

const QuestionLibEdit: React.FC<QuestionLibEditProps> = ({
  history,
  dispatch,
  loading,
  questionLibEdit,
}) => {
  const [isOptionsDisplay, setIsOptionsDisplay] = useState(false);

  const { courseIdDataSource, questionFields, when } = questionLibEdit;
  const { location } = history;

  const getFormConfig = (optionsDisplay: boolean): FormItemComponentProps[] => {
    const basicFormConfig: FormItemComponentProps[] = [{
      label: '所属课程',
      name: 'courseId',
      component: FORM_COMPONENT.Select,
      required: true,
      datasource: courseIdDataSource,
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
      required: false,
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

    // 去掉选项的Form
    basicFormConfig.splice(3, 1);
    return basicFormConfig;
  };

  const handleFieldsChange = (allFields: any) => {
    console.log(allFields);
    const { questionType } = allFields;
    if (+questionType === QUESTION_TYPE.Single || +questionType === QUESTION_TYPE.Multiple) {
      setIsOptionsDisplay(true);
    } else {
      setIsOptionsDisplay(false);
    }

    dispatch({
      type: 'questionLibEdit/changeQuestionFields',
      payload: { data: allFields },
    })
  }

  const handleSubmit = (allFields: object) => {
    const isCreate = location.pathname.split('/')[3] === 'create';

    console.log(allFields);
    // if (isCreate) {
    //   dispatch({
    //     type: 'questionLibEdit/createQuestion',
    //     payload: { data: allFields },
    //   })
    // } else {
    //   dispatch({
    //     type: 'questionLibEdit/updateQuestion',
    //     payload: {
    //       data: {
    //         ...allFields,
    //         questionId: questionFields.questionId
    //       }
    //     },
    //   })
    // }
  }

  return (
    <>
      <RouterPrompt when={when} />
      <CustomCard>
        <CustomForm
          layout="horizontal"
          values={questionFields}
          formTypes={CUSTOM_FORM_TYPES.OneColumn}
          loading={loading}
          onFieldsChange={handleFieldsChange}
          formConfig={getFormConfig(isOptionsDisplay)}
          onSubmit={handleSubmit}
        />
      </CustomCard>
    </>
  )
}
const mapStateToProps = ({
  questionLibEdit,
  loading,
}: {
  questionLibEdit: StateType,
  loading: any
}) => ({
  questionLibEdit,
  loading: loading.models.questionLibEdit
});

export default connect(mapStateToProps)(QuestionLibEdit);
