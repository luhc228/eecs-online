import React from 'react';
import { connect } from 'dva';
import CustomForm from '@/components/CustomForm';
import { CUSTOM_FORM_TYPES, FORM_COMPONENT, JUDGE_VALUE } from '@/enums';
import { FormItemComponentProps, UmiComponentProps, SelectComponentDatasourceModel } from '@/interfaces/components';
import { StateType } from '../../models';
import RouterPrompt from '@/components/RouterPrompt';
import { HomeworkListItem } from '@/interfaces/studentHomeworkEdit';
import { getOption } from '@/utils';

export interface QuestionFormProps extends UmiComponentProps {
  loading: boolean;
  studentHomeworkEdit: StateType;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  loading,
  dispatch,
  studentHomeworkEdit
}) => {
  const { data, homeworkFields, when, questionFormIdMap } = studentHomeworkEdit;
  const {
    singleQuestionList,
    multipleQuestionList,
    judgeQuestionList,
    programQuestionList
  } = data;

  const generateFormConfig = (): FormItemComponentProps[] => {
    let formConfig: FormItemComponentProps[] = [];

    if (judgeQuestionList && judgeQuestionList.length) {
      const formItems = judgeQuestionList.map((item: HomeworkListItem) => {
        const datasource: SelectComponentDatasourceModel[] = [
          {
            value: JUDGE_VALUE.InCorrect,
            label: '错误',
          },
          {
            value: JUDGE_VALUE.Correct,
            label: '正确',
          }
        ];
        return {
          label: (
            <>
              <div>【判断题】 {item.content} （{item.questionScore}分）</div>
              {item.contentImage && item.contentImage !== '' && item.contentImage.split('|').map((imgSrc: string, index: number) => (
                <div key={String(index)}>
                  <img src={imgSrc} alt="questionImage" />
                </div>
              ))}
            </>
          ),
          name: `judge${item.questionId}`,
          component: FORM_COMPONENT.Radio,
          datasource,
          required: false
        }
      });

      formConfig = [...formConfig, ...formItems]
    }

    if (singleQuestionList && singleQuestionList.length) {
      const formItems = singleQuestionList.map((item: HomeworkListItem) => {
        let datasource: SelectComponentDatasourceModel[] = [];
        if (item.options && item.options.length) {
          datasource = item.options.split('|').map((option: string, index: number) => ({
            value: getOption(index),
            label: `${getOption(index)}、${option}`,
          }))
        }
        return {
          label: (
            <>
              <div>【单选题】 {item.content} （{item.questionScore}分）</div>
              {item.contentImage && item.contentImage !== '' && item.contentImage.split('|').map((imgSrc: string, index: number) => (
                <div key={String(index)}>
                  <img src={imgSrc} alt="questionImage" />
                </div>
              ))}
            </>
          ),
          name: `single${item.questionId}`,
          component: FORM_COMPONENT.Radio,
          datasource,
          required: false
        }
      });

      formConfig = [...formConfig, ...formItems]
    }

    if (multipleQuestionList && multipleQuestionList.length) {
      const formItems = multipleQuestionList.map((item: HomeworkListItem) => {
        let datasource: SelectComponentDatasourceModel[] = [];
        if (item.options && item.options.length) {
          datasource = item.options.split('|').map((option: string, index: number) => ({
            value: getOption(index),
            label: `${getOption(index)}、${option}`,
          }))
        }
        return {
          label: (
            <>
              <div>【多选题】 {item.content} （{item.questionScore}分）</div>
              {item.contentImage && item.contentImage !== '' && item.contentImage.split('|').map((imgSrc: string, index: number) => (
                <div key={String(index)}>
                  <img src={imgSrc} alt="questionImage" />
                </div>
              ))
              }
            </>
          ),
          name: `multiple${item.questionId}`,
          component: FORM_COMPONENT.Checkbox,
          datasource,
          required: false
        }
      });

      formConfig = [...formConfig, ...formItems]
    }

    if (programQuestionList && programQuestionList.length) {
      const formItems = programQuestionList.map((item: HomeworkListItem) => ({
        label: (
          <>
            <div>【编程题】 {item.content} （{item.questionScore}分）</div>
            {item.contentImage && item.contentImage !== '' && item.contentImage.split('|').map((imgSrc: string, index: number) => (
              <div key={String(index)}>
                <img src={imgSrc} alt="questionImage" />
              </div>
            ))}
          </>
        ),
        name: `program${item.questionId}`,
        component: FORM_COMPONENT.CodeEditor,
        required: false
      }))

      formConfig = [...formConfig, ...formItems]
    }

    return formConfig;
  }

  const handleFieldsChange = (allFields: object) => {
    dispatch({
      type: 'studentHomeworkEdit/changeHomeworkFields',
      payload: {
        data: allFields,
      }
    })
  }

  const handleSubmit = (allFields: object) => {
    console.log(allFields);
    dispatch({
      type: 'studentHomeworkEdit/submitHomeworkAnswer',
      payload: {
        data: allFields,
        questionFormIdMap,
      }
    })
  }

  return (
    <>
      <RouterPrompt when={when} />
      <CustomForm
        layout="vertical"
        loading={loading}
        values={homeworkFields}
        formTypes={CUSTOM_FORM_TYPES.OneColumn}
        onFieldsChange={handleFieldsChange}
        formConfig={generateFormConfig()}
        onSubmit={handleSubmit}
      />
    </>
  )
}

const mapStateToProps = ({
  studentHomeworkEdit,
  loading
}: {
  studentHomeworkEdit: StateType,
  loading: any,
}) => ({
  studentHomeworkEdit,
  loading: loading.models.studentHomeworkEdit
})

export default connect(mapStateToProps)(QuestionForm);
