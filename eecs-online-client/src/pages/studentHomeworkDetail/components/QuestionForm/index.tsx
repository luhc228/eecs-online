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
      const formItems: FormItemComponentProps[] = [];
      list.forEach((item: HomeworkDetailListItem) => {
        const {
          questionId,
          content,
          questionType,
          options,
          answer,
          submitAnswer,
          questionScore,
          score,
          contentImage
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

              const result = {
                label: (
                  <div className={styles.label}>
                    <span>【判断题】{content}（{questionScore}分）</span>
                    <div>
                      <span style={{ color: 'red' }}>正确答案：{answer === JUDGE_VALUE.InCorrect ? '错误' : '正确'}</span>
                      <span style={{ marginLeft: 10, color: 'red' }}>你的得分：{score}分</span>
                    </div>
                    {contentImage && contentImage !== '' && contentImage.split('|').map((imgSrc: string, index: number) => (
                      <div key={String(index)}>
                        <img src={imgSrc} alt="questionImage" />
                      </div>
                    ))}
                  </div>
                ),
                name: `judge${questionId}`,
                component: FORM_COMPONENT.Radio,
                initialValue: submitAnswer ? Number(submitAnswer) : '',
                datasource,
                props: {
                  disabled: true
                },
                required: false
              }

              formItems.push(result);

              break;
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

              const result = {
                label: (
                  <div className={styles.label}>
                    <span>【单选题】{content}（{questionScore}分）</span>
                    <div>
                      <span style={{ color: 'red' }}>正确答案：{answer}</span>
                      <span style={{ marginLeft: 10, color: 'red' }}>你的得分：{score}分</span>
                    </div>
                    {contentImage && contentImage !== '' && contentImage.split('|').map((imgSrc: string, index: number) => (
                      <div key={String(index)}>
                        <img src={imgSrc} alt="questionImage" />
                      </div>
                    ))}
                  </div>
                ),
                name: `single${questionId}`,
                component: FORM_COMPONENT.Radio,
                initialValue: submitAnswer || '',
                datasource,
                props: {
                  disabled: true
                },
                required: false
              }

              formItems.push(result);

              break;
            }
          case QUESTION_TYPE.multiple:
            {
              let datasource: SelectComponentDatasourceModel[] = [];
              let initialValue: string[] = [];
              if (submitAnswer && typeof submitAnswer === 'string' && submitAnswer.includes('|')) {
                initialValue = submitAnswer.split('|')
              }
              if (options && options.length) {
                datasource = options.split('|').map((option: string, index: number) => ({
                  value: getOption(index),
                  label: `${getOption(index)}、${option}`,
                }))
              }
              const result = {
                label: (
                  <div className={styles.label}>
                    <span>【多选题】{content}（{questionScore}分）</span>
                    <div>
                      <span style={{ color: 'red' }}>正确答案：{answer && answer.split('|').sort().join('、')}</span>
                      <span style={{ marginLeft: 10, color: 'red' }}>你的得分：{score}分</span>
                    </div>
                    {contentImage && contentImage !== '' && contentImage.split('|').map((imgSrc: string, index: number) => (
                      <div key={String(index)}>
                        <img src={imgSrc} alt="questionImage" />
                      </div>
                    ))}
                  </div>
                ),
                name: `multiple${questionId}`,
                component: FORM_COMPONENT.Checkbox,
                props: {
                  disabled: true
                },
                initialValue,
                datasource,
                required: false
              }

              formItems.push(result);

              break;
            }
          case QUESTION_TYPE.program:
            {
              const result = {
                label: (
                  <div className={styles.label}>
                    <span>【编程题】{content}（{questionScore}分）</span>
                    <div>
                      <span style={{ color: 'red' }}>正确答案：{answer}</span>
                      <span style={{ marginLeft: 10, color: 'red' }}>你的得分：{score}分</span>
                    </div>
                    {contentImage && contentImage !== '' && contentImage.split('|').map((imgSrc: string, index: number) => (
                      <div key={String(index)}>
                        <img src={imgSrc} alt="questionImage" />
                      </div>
                    ))}
                  </div>
                ),
                name: `program${item.questionId}`,
                component: FORM_COMPONENT.CodeEditor,
                initialValue: submitAnswer || '',
                props: {
                  readOnly: true,
                },
                required: false
              }
              formItems.push(result);
              break;
            }
          default:
            break
        }
      })

      formConfig = [...formConfig, ...formItems]
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
