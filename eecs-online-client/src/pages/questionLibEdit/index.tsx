import React, { useState, useEffect } from 'react';
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
  const [dynamicKeys, setDynamicKeys] = useState();

  const { courseIdDataSource, questionFields, when } = questionLibEdit;
  const { location } = history;

  const optionsDataSource = ['A', 'B', 'C', 'D', 'E', 'F'];

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
      {
        value: 0,
        label: '错误',
      },
      {
        value: 1,
        label: '正确',
      }
    ],
  }

  const programQuestionAnswerFormItem = {
    component: FORM_COMPONENT.TextArea,
  }

  const answerFormItemMap: { [key: string]: object } = {
    [QUESTION_TYPE.Judge]: judgeQuestionAnswerFormItem,
    [QUESTION_TYPE.Single]: singleQuestionAnswerFormItem,
    [QUESTION_TYPE.Multiple]: multipleQuestionAnswerFormItem,
    [QUESTION_TYPE.Program]: programQuestionAnswerFormItem,
  }
  /**
   * 动态删除表单项
   * @param k key 唯一id
   */
  const handleDynamicFieldSetRemove = (k: number) => {
    const keys = dynamicKeys;
    // need at least one input
    if (keys.length === 1) {
      return;
    }

    const newKeys = keys.filter((key: number) => key !== k);
    setDynamicKeys(newKeys);
  }

  /**
   * 动态增加表单项
   */
  const handleDynamicFieldSetAdd = () => {
    const keys = dynamicKeys;
    const newKeys = keys.concat(keys[keys.length - 1] + 1);
    setDynamicKeys(newKeys);
  }

  const getFormConfig = (
    optionsDisplay: boolean,
    dynamicFieldSetKeys: number[],
    questionType: number,
  ): FormItemComponentProps[] => {
    let answerDataSource;
    if (dynamicFieldSetKeys) {
      answerDataSource = dynamicFieldSetKeys.map(k => ({
        value: k,
        label: optionsDataSource[k],
      }))
    }

    const questionFormItem: FormItemComponentProps = {
      label: '答案',
      name: 'answer',
      required: true,
      component: FORM_COMPONENT.Input,
      ...answerFormItemMap[String(questionType)],
      datasource: answerDataSource
    };

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
      },
    },
    {
      ...questionFormItem
    }
    ];

    if (!optionsDisplay) {
      return basicFormConfig;
    }

    // 动态增加Form表单元素
    const dynamicFieldSets: FormItemComponentProps[] = dynamicFieldSetKeys.map((key) => ({
      label: `选项${key}`,
      name: `options[${key}]`,
      component: FORM_COMPONENT.DynamicFieldSet,
      required: false,
      initialValue: [],
      props: {
        handleDelete: handleDynamicFieldSetRemove,
        handleAdd: handleDynamicFieldSetAdd,
        dynamicKey: key,
      }
    }))

    basicFormConfig.splice(3, 0, ...dynamicFieldSets);
    return basicFormConfig;
  };

  const handleFieldsChange = (allFields: object) => {
    dispatch({
      type: 'questionLibEdit/changeQuestionFields',
      payload: { data: allFields },
    })
  }

  useEffect(() => {
    const { questionType } = questionFields;
    // 清空上次选择的answer的FormItem
    dispatch({
      type: 'questionLibEdit/changeQuestionFields',
      payload: {
        data: {
          ...questionFields,
          answer: []
        }
      },
    })
    if (+questionType === QUESTION_TYPE.Single || +questionType === QUESTION_TYPE.Multiple) {
      setIsOptionsDisplay(true);
      setDynamicKeys([0]);
    } else {
      setIsOptionsDisplay(false);
      setDynamicKeys(undefined);
    }
  }, [questionFields.questionType]);

  const handleSubmit = (allFields: object) => {
    const isCreate = location.pathname.split('/')[3] === 'create';

    console.log(allFields);
    if (isCreate) {
      dispatch({
        type: 'questionLibEdit/createQuestion',
        payload: { data: allFields },
      })
    } else {
      dispatch({
        type: 'questionLibEdit/updateQuestion',
        payload: {
          data: {
            ...allFields,
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
          formConfig={getFormConfig(isOptionsDisplay, dynamicKeys, questionFields.questionType)}
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
