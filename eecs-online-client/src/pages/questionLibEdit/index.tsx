import React from 'react';
import { connect } from 'dva';
import CustomForm from '@/components/CustomForm';
import { CUSTOM_FORM_TYPES, FORM_COMPONENT, QUESTION_TYPE, JUDGE_VALUE } from '@/enums';
import { FormItemComponentProps, UmiComponentProps } from '@/interfaces/components';
import { questionTypeMap } from '../questionLib';
import appConfig from '@/appConfig';
import CustomCard from '@/components/CustomCard';
import { StateType } from './models';
import RouterPrompt from '@/components/RouterPrompt';
import { QuestionFieldsModel } from '@/interfaces/questionLibEdit';
import { getOption } from '@/utils';

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
  const { courseIdDataSource, questionFields, when, dynamicKeys, optionDisplay } = questionLibEdit;

  const { location }: any = history;

  const singleQuestionAnswerFormItem = {
    component: FORM_COMPONENT.Select,
  };

  const multipleQuestionAnswerFormItem = {
    component: FORM_COMPONENT.Select,
    props: {
      mode: 'multiple'
    },
  }

  const judgeQuestionAnswerFormItem = {
    component: FORM_COMPONENT.Select,
    datasource: [

    ],
  }

  const programQuestionAnswerFormItem = {
    component: FORM_COMPONENT.TextArea,
  }

  const answerFormItemMap: { [key: string]: object } = {
    [QUESTION_TYPE.judge]: judgeQuestionAnswerFormItem,
    [QUESTION_TYPE.single]: singleQuestionAnswerFormItem,
    [QUESTION_TYPE.multiple]: multipleQuestionAnswerFormItem,
    [QUESTION_TYPE.program]: programQuestionAnswerFormItem,
  }
  /**
   * 动态删除表单项
   * @param k key 唯一id
   */
  const handleDynamicFieldSetRemove = (k: number) => {
    const keys = dynamicKeys;

    const newKeys = keys.filter((key: number) => key !== k);
    dispatch({
      type: 'questionLibEdit/changeDynamicKeys',
      payload: {
        dynamicKeys: newKeys
      }
    })
  }

  /**
   * 动态增加表单项
   */
  const handleDynamicFieldSetAdd = () => {
    const keys = dynamicKeys;
    const newKeys = keys.concat(keys[keys.length - 1] + 1);
    dispatch({
      type: 'questionLibEdit/changeDynamicKeys',
      payload: {
        dynamicKeys: newKeys
      }
    })
  }

  const getFormConfig = (
    optionsDisplay: boolean,
    dynamicFieldSetKeys: number[],
    questionType: number,
  ): FormItemComponentProps[] => {
    let answerDataSource;
    if (dynamicFieldSetKeys && (questionType === QUESTION_TYPE.multiple || questionType === QUESTION_TYPE.single)) {
      answerDataSource = dynamicFieldSetKeys.map((_, index) => ({
        value: getOption(index),
        label: getOption(index),
      }))
    }
    if (questionType === QUESTION_TYPE.judge) {
      answerDataSource = [
        { value: JUDGE_VALUE.InCorrect, label: '错误' },
        { value: JUDGE_VALUE.Correct, label: '正确' }
      ]
    }

    const answerFormItem = {
      label: '答案',
      name: 'answer',
      required: true,
      ...answerFormItemMap[String(questionType)],
      datasource: answerDataSource
    } as FormItemComponentProps;

    const basicFormConfig: FormItemComponentProps[] = [{
      label: '所属课程',
      name: 'courseId',
      component: FORM_COMPONENT.Select,
      required: true,
      datasource: courseIdDataSource,
    },
    {
      label: '单元',
      name: 'unit',
      component: FORM_COMPONENT.Input,
      required: true,
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
          value: Number(value),
          label,
        }
      }),
    },
    {
      label: '题目图片',
      name: 'contentImage',
      component: FORM_COMPONENT.Upload,
      required: false,
      props: {
        name: 'image',
        multiple: true,
        action: appConfig.uploadUrl,
      }
    },
    {
      label: '题目分值',
      name: 'questionScore',
      component: FORM_COMPONENT.InputNumber,
      required: true,
      props: { unit: '分' },
    },
    {
      ...answerFormItem
    }
    ];

    if (!optionsDisplay) {
      return basicFormConfig;
    }

    // 动态增加Form表单元素
    const dynamicFieldSets: FormItemComponentProps[] = dynamicFieldSetKeys.map((key) => ({
      label: `选项${key}`,
      name: `option${key}`,
      component: FORM_COMPONENT.DynamicFieldSet,
      required: true,
      initialValue: [],
      props: {
        handleDelete: handleDynamicFieldSetRemove,
        handleAdd: handleDynamicFieldSetAdd,
        dynamicKey: key,
      }
    }))

    basicFormConfig.splice(4, 0, ...dynamicFieldSets);
    return basicFormConfig;
  };

  const handleFieldsChange = (allFields: QuestionFieldsModel, changedFields: any) => {
    const { questionType } = changedFields;

    if (questionType && questionType.value !== questionFields.questionType) {
      if (
        questionType.value === QUESTION_TYPE.single ||
        questionType.value === QUESTION_TYPE.multiple) {
        dispatch({
          type: 'questionLibEdit/setOptionsDisplay',
          payload: {
            optionDisplay: true
          }
        });
        dispatch({
          type: 'questionLibEdit/changeDynamicKeys',
          payload: {
            dynamicKeys: [0]
          }
        })
      } else {
        dispatch({
          type: 'questionLibEdit/setOptionsDisplay',
          payload: {
            optionDisplay: false
          }
        });
        dispatch({
          type: 'questionLibEdit/changeDynamicKeys',
          payload: {
            dynamicKeys: undefined
          }
        })
      }

      dispatch({
        type: 'questionLibEdit/changeQuestionFields',
        payload: { data: { ...allFields, answer: undefined } },
      })

      return;
    }

    dispatch({
      type: 'questionLibEdit/changeQuestionFields',
      payload: { data: { ...allFields } },
    })
  }

  const handleSubmit = (allFields: QuestionFieldsModel) => {
    const isCreate = location.pathname.split('/')[3] === 'create';
    const { questionId } = location.query;

    const { answer, contentImage } = allFields;
    const optionsKeys = Object.keys(allFields).filter((k: string) => k.includes('option'));
    let options;
    if (optionsKeys.length) {
      options = optionsKeys.map((k: string) => {
        const option = allFields[k];
        delete allFields[k]
        return option
      }).join('|');
    }
    if (contentImage) {
      const newContentImage = contentImage.map((item) => {

      })
    }

    const newAllFields = {
      ...allFields,
      answer: Array.isArray(answer) ? answer.join('|') : answer,
      options,
      // contentImage: '',
      questionId,
    }

    if (isCreate) {
      dispatch({
        type: 'questionLibEdit/createQuestion',
        payload: { data: newAllFields },
      })
    } else {
      dispatch({
        type: 'questionLibEdit/updateQuestion',
        payload: {
          data: {
            ...newAllFields,
            questionId: questionFields.questionId
          }
        },
      })
    }
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
          formConfig={getFormConfig(optionDisplay, dynamicKeys, questionFields.questionType)}
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
