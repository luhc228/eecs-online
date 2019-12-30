import React from 'react';
import { connect } from 'dva';
import { StateType } from '../../models';
import CustomForm from '@/components/CustomForm';
import { CUSTOM_FORM_TYPES, QUESTION_TYPE, JUDGE_VALUE, FORM_COMPONENT } from '@/enums';
import { FormItemComponentProps, SelectComponentDatasourceModel } from '@/interfaces/components';
import { HomeworkDetailListItem } from '@/interfaces/studentHomeworkDetail';
import { getOption } from '@/utils';
import styles from './index.less';

export interface QuestionFormProps {
  studentHomeworkDetail: StateType;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  studentHomeworkDetail
}) => {
  const { data, homeworkFields } = studentHomeworkDetail;
  const { list } = data;

  const generateFormConfig = (): FormItemComponentProps[] => {
    let formConfig: FormItemComponentProps[] = [];

    if (list && list.length) {
      const formItems = list.map((item: HomeworkDetailListItem) => {
        const {
          questionId,
          content,
          questionType,
          options,
          answer,
          submitAnswer,
          questionScore,
          score,
        } = item;
        switch (questionType) {
          case QUESTION_TYPE.judge:
            {
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
                //   label: `
                // 【判断题】
                // ${content}
                // （${questionScore}分）
                // `,
                label: (
                  <div className={styles.label}>
                    <span>【判断题】{content}（{questionScore}分）</span>
                    <span>正确答案：{answer}</span>
                    <span>你的得分：{score}分</span>
                  </div>
                ),
                name: `judge${questionId}`,
                component: FORM_COMPONENT.Radio,
                initialValue: Number(submitAnswer),
                datasource,
                props: {
                  disabled: true
                },
                required: false
              }
            }
          case QUESTION_TYPE.single:
            {
              let datasource: SelectComponentDatasourceModel[] = [];
              if (options && options.length) {
                datasource = options.split('|').map((option: string, index: number) => ({
                  value: getOption(index),
                  label: `${getOption(index)}、${option}`,
                }))
              }

              return {
                label: `
                【单选题】
                ${content} 
                （${questionScore}分）
                `,
                name: `single${questionId}`,
                component: FORM_COMPONENT.Radio,
                initialValue: submitAnswer,
                datasource,
                props: {
                  disabled: true
                },
                required: false
              }
            }
          case QUESTION_TYPE.multiple:
            {
              let datasource: SelectComponentDatasourceModel[] = [];
              let initialValue: string[] = [];
              if (answer && typeof answer === 'string' && answer.includes('|')) {
                initialValue = answer.split('|')
              }
              if (options && options.length) {
                datasource = options.split('|').map((option: string, index: number) => ({
                  value: getOption(index),
                  label: `${getOption(index)}、${option}`,
                }))
              }
              return {
                label: `
                【多选题】
                ${content} 
                （${questionScore}分）
                `,
                name: `multiple${questionId}`,
                component: FORM_COMPONENT.Checkbox,
                props: {
                  disabled: true
                },
                initialValue,
                datasource,
                required: false
              }
            }
          case QUESTION_TYPE.program:
            return {
              label: `
              【编程题】
              ${item.content} 
              （${item.questionScore}分）
              `,
              name: `program${item.questionId}`,
              component: FORM_COMPONENT.CodeEditor,
              initialValue: submitAnswer,
              props: {
                readOnly: true,
              },
              required: false
            }

          default:
            return {}
        }
      })

      formConfig = [...formConfig, ...formItems]
      console.log(formConfig);
    }

    return formConfig;
  }

  return (
    <CustomForm
      layout="vertical"
      values={homeworkFields}
      formTypes={CUSTOM_FORM_TYPES.OneColumn}
      onFieldsChange={() => { }}
      formConfig={generateFormConfig()}
    />
  )
}

const mapStateToProps = ({
  studentHomeworkDetail
}: {
  studentHomeworkDetail: StateType
}) => ({
  studentHomeworkDetail
})

export default connect(mapStateToProps)(QuestionForm);
