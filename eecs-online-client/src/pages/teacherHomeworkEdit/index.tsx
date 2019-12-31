/**
 * 教师编辑作业信息题目——题目列表
 */
import React from 'react';
import { connect } from 'dva';
import RouterPrompt from '@/components/RouterPrompt';
import CustomForm from '@/components/CustomForm';
import { CUSTOM_FORM_TYPES, FORM_COMPONENT, QUESTION_TYPE } from '@/enums';
import { FormItemComponentProps, UmiComponentProps } from '@/interfaces/components';
import { StateType } from './models';
import CustomCard from '@/components/CustomCard';
import QuestionDetail from './components/QuestionDetail'

export const questionTypeMap = {
  [QUESTION_TYPE.Single]: '单选题',
  [QUESTION_TYPE.Multiple]: '多选题',
  [QUESTION_TYPE.Judge]: '判断题',
  [QUESTION_TYPE.Program]: '编程题',
};

const formConfig: FormItemComponentProps[] = [
  {
    label: '作业名称',
    name: 'homeworkName',
    component: FORM_COMPONENT.Input,
    required: true,
  },
  // {
  //   label: '题目类型',
  //   name: 'questionType',
  //   component: FORM_COMPONENT.Select,
  //   required: true,
  //   datasource: Object.entries(questionTypeMap).map(item => {
  //     const [value, label] = item;
  //     return {
  //       value,
  //       label,
  //     };
  //   }),
  // },
];

interface TeacherHomeworkEditProps extends UmiComponentProps {
  teacherHomeworkEdit: StateType,
  location: Location
}

const TeacherHomeworkEdit: React.FC<TeacherHomeworkEditProps> = ({ teacherHomeworkEdit, location, dispatch }) => {
  const { when, targetKeys, homeworkDetailFields } = teacherHomeworkEdit;
  const { query } = location;

  const handleSubmit = (allFields: object) => {
    const isCreate = location.pathname.split('/')[3] === 'create';
    if (isCreate) {
      dispatch({
        type: 'teacherHomeworkEdit/createTeacherHomework',
        payload: {
          data: {
            ...allFields,
            questionIdList: targetKeys
          }
        },
      })
    } else {
      let { homeworkId } = query;
      if (typeof homeworkId === 'string') {
        homeworkId = Number(homeworkId)
      }  
      dispatch({
        type: 'teacherHomeworkEdit/updateTeacherHomework',
        payload: {
          data: {
            ...allFields,
            questionIdList: targetKeys,
            homeworkId,
          }
        }
      })
    }
  }

  return (
    <>
      <RouterPrompt when={when} />
      <CustomCard>
        <CustomForm
          layout="vertical"
          values={homeworkDetailFields}
          formTypes={CUSTOM_FORM_TYPES.OneColumn}
          loading={false}
          // TODO: bug: when add this fieldsChange function the error will disappear
          onFieldsChange={() => { }}
          formConfig={formConfig}
          onSubmit={handleSubmit}
        >
          <QuestionDetail />
        </CustomForm>
      </CustomCard>
    </>
  )
}

const mapStateToProps = ({
  teacherHomeworkEdit,
  router,
}: {
  teacherHomeworkEdit: StateType,
  router: {
    location: Location
  },
}) => ({
  teacherHomeworkEdit,
  location: router.location,
})

export default connect(mapStateToProps)(TeacherHomeworkEdit);