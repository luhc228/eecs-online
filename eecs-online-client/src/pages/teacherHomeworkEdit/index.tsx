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
import QuestionTable from './components/QuestionTable';

export const questionTypeMap = {
  [QUESTION_TYPE.single]: '单选题',
  [QUESTION_TYPE.multiple]: '多选题',
  [QUESTION_TYPE.judge]: '判断题',
  [QUESTION_TYPE.program]: '编程题',
};

const formConfig: FormItemComponentProps[] = [
  {
    label: '作业名称',
    name: 'homeworkName',
    component: FORM_COMPONENT.Input,
    required: true,
  },
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
          <QuestionTable />
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
