/**
 * 教师编辑作业信息题目——题目列表
 */
import React, { useEffect } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import RouterPrompt from '@/components/RouterPrompt';
import CustomForm from '@/components/CustomForm';
import { CUSTOM_FORM_TYPES, FORM_COMPONENT, QUESTION_TYPE } from '@/enums';
import { FormItemComponentProps, UmiComponentProps } from '@/interfaces/components';
import { StateType } from './models';
import CustomCard from '@/components/CustomCard';
import QuestionTable from './components/QuestionTable';
import QuestionDetail from './components/QuestionDetail';

export const questionTypeMap = {
  [QUESTION_TYPE.single]: '单选题',
  [QUESTION_TYPE.multiple]: '多选题',
  [QUESTION_TYPE.judge]: '判断题',
  [QUESTION_TYPE.program]: '编程题',
};

interface TeacherHomeworkEditProps extends UmiComponentProps {
  teacherHomeworkEdit: StateType,
  location: Location
}

const TeacherHomeworkEdit: React.FC<TeacherHomeworkEditProps> = ({
  teacherHomeworkEdit,
  location,
  dispatch
}) => {
  const {
    when,
    homeworkFormFields,
    courseIdDataSource,
    selectQuestionList
  } = teacherHomeworkEdit;

  const { query } = location;

  const handleCourseIdSelectChange = (courseId: number) => {
    dispatch({
      type: 'teacherHomeworkEdit/fetchCourseQuestionLib',
      payload: {
        courseId
      }
    })
  };

  const formConfig: FormItemComponentProps[] = [
    {
      label: '作业名称',
      name: 'homeworkName',
      component: FORM_COMPONENT.Input,
      required: true,
    },
    {
      label: '课程名称',
      name: 'courseId',
      component: FORM_COMPONENT.Select,
      required: true,
      datasource: courseIdDataSource,
    },
    {
      label: '作业描述',
      name: 'description',
      component: FORM_COMPONENT.TextArea,
      required: true,
    },
    {
      label: '起始时间',
      name: 'startAt',
      component: FORM_COMPONENT.DatePicker,
      props: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss'
      },
      required: true,
    },
    {
      label: '结束时间',
      name: 'endAt',
      component: FORM_COMPONENT.DatePicker,
      props: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss'
      },
      required: true,
    },
    {
      label: '作业总分',
      name: 'homeworkScore',
      component: FORM_COMPONENT.Input,
      required: false,
      initialValue: 0,
      props: {
        disabled: true
      }
    }
  ];

  const handleFieldsChange = (allFields: Object) => {
    dispatch({
      type: 'teacherHomeworkEdit/changeTeacherHomeworkFormFields',
      payload: {
        data: allFields
      }
    })
  }

  const handleSubmit = (allFields: any) => {
    const { startAt, endAt } = allFields;
    const newStartAt = moment(startAt).format('YYYY-MM-DD HH:mm:ss');
    const newEndAt = moment(endAt).format('YYYY-MM-DD HH:mm:ss');

    const values = {
      ...allFields,
      startAt: newStartAt,
      endAt: newEndAt,
      homeworkQuestionList: selectQuestionList
    };

    const isCreate = location.pathname.split('/')[3] === 'create';
    if (isCreate) {
      dispatch({
        type: 'teacherHomeworkEdit/createTeacherHomework',
        payload: {
          data: values
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
            homeworkId,
            ...values
          }
        }
      })
    }
  }

  useEffect(() => {
    if (homeworkFormFields.courseId) {
      handleCourseIdSelectChange(homeworkFormFields.courseId);
    }
  }, [homeworkFormFields.courseId])
  return (
    <>
      <RouterPrompt when={when} />
      <CustomCard>
        <CustomForm
          layout="horizontal"
          values={homeworkFormFields}
          formTypes={CUSTOM_FORM_TYPES.TwoColumn}
          loading={false}
          // TODO: bug: when add this fieldsChange function the error will disappear
          onFieldsChange={handleFieldsChange}
          formConfig={formConfig}
          onSubmit={handleSubmit}
        >
          {/* 题目表格穿梭框 */}
          <QuestionTable />
          {/* 题目详情 */}
          {/* <QuestionDetail /> */}
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
