import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import umiRouter from 'umi/router';
import { Input, Button, Form } from 'antd';
import { StateType } from '../../models';
import CustomForm from '@/components/CustomForm';
import { CUSTOM_FORM_TYPES, QUESTION_TYPE, JUDGE_VALUE, FORM_COMPONENT } from '@/enums';
import { FormItemComponentProps, SelectComponentDatasourceModel } from '@/interfaces/components';
import { getOption } from '@/utils';
import styles from './index.less';
import { HomeworkDetailListItem, DetailEditModel } from '@/interfaces/teacherHomeworkDetail';

export interface QuestionFormProps {
  teacherHomeworkDetail: StateType;
  dispatch: Dispatch<any>;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ teacherHomeworkDetail, dispatch }) => {
  const { data, filterFields } = teacherHomeworkDetail;
  // console.log('QuestionForm', data);
  // console.log(filterFields);
  const { list, questionScoreList } = data;

  // useEffect(() => {
  //   if (!questionScoreList) {
  //     return;
  //   }
  //   dispatch({
  //     type: 'teacherHomeworkDetail/fetchHomeworkCondition',
  //     payload: {
  //       data: {
  //         ...filterFields,
  //       }
  //     },
  //   })
  // }, [!questionScoreList]);

  function handleEdit(allFields: DetailEditModel) {
    umiRouter.push({
      pathname: '/teacher/homework/completion/detail/edit',
      query: {
        homeworkId: allFields.homeworkId,
        studentId: allFields.studentId,
        questionScore: allFields.score,
        questionId: allFields.questionId,
      }
    })
  }

  function handleSubmit() {
    dispatch({
      type: 'teacherHomeworkDetail/changeHomeworkFields',
      payload: {
        data,
      },
    });
  }

  const generateFormConfig = (): FormItemComponentProps[] => {
    let formConfig: FormItemComponentProps[] = [];

    if (list && list.length) {
      const formItems: FormItemComponentProps[] = [];
      const { homeworkId, studentId } = filterFields;
      list.forEach((item: HomeworkDetailListItem) => {
        const {
          questionId,
          content,
          questionType,
          options,
          answer,
          submitAnswer,
          questionScore,
          contentImage,
          status,
          score,
        } = item;
        const allFields = {
          questionId,
          score,
          studentId,
          homeworkId,
        };
        switch (questionType) {
          case QUESTION_TYPE.judge: {
            const datasource: SelectComponentDatasourceModel[] = [
              {
                value: JUDGE_VALUE.InCorrect,
                label: '错误',
              },
              {
                value: JUDGE_VALUE.Correct,
                label: '正确',
              },
            ];
            const result = {
              label: (
                <div className={styles.label}>
                  <span>
                    【判断题】{content}（{questionScore}分）
                  </span>
                  <div style={{ marginLeft: 70 }}>
                    <span style={{ color: 'red' }}>正确答案：{answer}</span>
                    <span
                      style={{ marginLeft: 10, color: 'red' }}
                      onClick={() => handleEdit(allFields)}
                    >
                      学生得分：{score}分
                    </span>
                  </div>
                  {contentImage &&
                    contentImage !== '' &&
                    contentImage.split('|').map((imgSrc: string) => (
                      <div>
                        <img src={imgSrc} alt="questionImage" />
                      </div>
                    ))}
                </div>
              ),
              name: `judge${questionId}`,
              component: FORM_COMPONENT.Radio,
              initialValue: Number(submitAnswer),
              datasource,
              props: {
                disabled: true,
              },
              required: false,
            };

            formItems.push(result);

            break;
          }
          case QUESTION_TYPE.single: {
            let datasource: SelectComponentDatasourceModel[] = [];
            if (options && options.length) {
              datasource = options.split('|').map((option: string, index: number) => ({
                value: getOption(index),
                label: `${getOption(index)}、${option}`,
              }));
            }
            const result = {
              label: (
                <div className={styles.label}>
                  <span>
                    【单选题】{content}（{questionScore}分）
                  </span>
                  <div style={{ marginLeft: 70 }}>
                    <span style={{ color: 'red' }}>正确答案：{answer}</span>
                    <span style={{ marginLeft: 10, color: 'red' }} onClick={() => handleEdit(allFields)}>学生得分：{score}分</span>
                  </div>
                  {contentImage &&
                    contentImage !== '' &&
                    contentImage.split('|').map((imgSrc: string) => (
                      <div>
                        <img src={imgSrc} alt="questionImage" />
                      </div>
                    ))}
                </div>
              ),
              name: `single${questionId}`,
              component: FORM_COMPONENT.Radio,
              initialValue: submitAnswer,
              datasource,
              props: {
                disabled: true,
              },
              required: false,
            };

            formItems.push(result);

            break;
          }
          case QUESTION_TYPE.multiple: {
            let datasource: SelectComponentDatasourceModel[] = [];
            let initialValue: string[] = [];
            if (answer && typeof answer === 'string' && answer.includes('|')) {
              initialValue = answer.split('|');
            }
            if (options && options.length) {
              datasource = options.split('|').map((option: string, index: number) => ({
                value: getOption(index),
                label: `${getOption(index)}、${option}`,
              }));
            }
            const result = {
              label: (
                <div className={styles.label}>
                  <span>
                    【多选题】{content}（{questionScore}分）
                  </span>
                  <div style={{ marginLeft: 70 }}>
                    <span style={{ color: 'red' }}>正确答案：{answer}</span>
                    <span style={{ marginLeft: 10, color: 'red' }} onClick={() => handleEdit(allFields)}>学生得分：{score}分</span>
                  </div>
                  {contentImage &&
                    contentImage !== '' &&
                    contentImage.split('|').map((imgSrc: string) => (
                      <div>
                        <img src={imgSrc} alt="questionImage" />
                      </div>
                    ))}
                </div>
              ),
              name: `multiple${questionId}`,
              component: FORM_COMPONENT.Checkbox,
              props: {
                disabled: true,
              },
              initialValue,
              datasource,
              required: false,
            };

            formItems.push(result);

            break;
          }
          case QUESTION_TYPE.program: {
            const result = {
              label: (
                <div className={styles.label}>
                  <span>
                    【编程题】{content}（{questionScore}分）
                  </span>
                  <div style={{ marginLeft: 70 }}>
                    <span style={{ color: 'red' }}>正确答案：{answer}</span>
                    <span style={{ marginLeft: 10, color: 'red' }} onClick={() => handleEdit(allFields)}>学生得分：{score}分</span>
                  </div>
                  {contentImage &&
                    contentImage !== '' &&
                    contentImage.split('|').map((imgSrc: string) => (
                      <div>
                        <img src={imgSrc} alt="questionImage" />
                      </div>
                    ))}
                </div>
              ),
              name: `program${item.questionId}`,
              component: FORM_COMPONENT.CodeEditor,
              initialValue: submitAnswer,
              props: {
                readOnly: true,
              },
              required: false,
            };
            formItems.push(result);
            break;
          }
          default:
            break;
        }
      });

      formConfig = [...formConfig, ...formItems];
    }

    return formConfig;
  };

  return (
    <CustomForm
      layout="vertical"
      values={filterFields}
      formTypes={CUSTOM_FORM_TYPES.OneColumn}
      onFieldsChange={() => {}}
      formConfig={generateFormConfig()}
      onSubmit={handleSubmit}
    />
  );
};

const mapStateToProps = ({ teacherHomeworkDetail }: { teacherHomeworkDetail: StateType }) => ({
  teacherHomeworkDetail,
});

export default connect(mapStateToProps)(QuestionForm);
