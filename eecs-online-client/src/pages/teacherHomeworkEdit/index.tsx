/**
 * 教师编辑作业信息题目——题目列表
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Icon } from 'antd';
import { Dispatch } from 'redux';
import { ColumnProps } from 'antd/es/table';
import RouterPrompt from '@/components/RouterPrompt';
import CustomForm from '@/components/CustomForm';
import { CUSTOM_FORM_TYPES, FORM_COMPONENT, QUESTION_TYPE } from '@/enums';
import { FormItemComponentProps } from '@/interfaces/components';
import { StateType } from './models';
import CustomTable from '@/components/CustomTable';
import QuestionListModal from './components/QuestionTableModal';
import QuestionTable from './components/QuestionTable';

export const questionTypeMap = {
  [QUESTION_TYPE.Single]: '单选题',
  [QUESTION_TYPE.Multiple]: '多选题',
  [QUESTION_TYPE.Judge]: '判断题',
  [QUESTION_TYPE.Program]: '编程题',
};

const formConfig: FormItemComponentProps[] = [
  {
    label: '所属课程',
    name: 'courseId',
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

const columns: ColumnProps<any>[] = [
  {
    dataIndex: '',
    title: '题目内容',
  },
  {
    dataIndex: 'questionType',
    title: '题目类型',
  },
  {
    dataIndex: 'questionScore',
    title: '题目分值',
  },
  {
    dataIndex: 'operation',
    title: '操作',
    // render: () => {

    // }
  },
];

interface TeacherHomeworkEditProps {
  teacherHomeworkEdit: StateType;
  dispatch: Dispatch<any>;
  location: Location;
}

const TeacherHomeworkEdit: React.FC<TeacherHomeworkEditProps> = ({
  teacherHomeworkEdit,
  location,
  dispatch,
}) => {
  const { teacherHomeworkFields, when, questionList, targetKeys } = teacherHomeworkEdit;

  const handleChange = (nextTargetKeys: string[]) => {
    dispatch({
      type: 'teacherHomeworkEdit/changeTargetKeys',
      payload: { nextTargetKeys },
    });
  };

  const handleSubmit = (allFields: object) => {
    const isCreate = location.pathname.split('/')[3] === 'create';
    if (isCreate) {
      dispatch({
        type: 'teacherHomeworkEdit/createHomework',
        payload: { ...allFields },
      });
    } else {
      dispatch({
        type: 'teacherHomeworkEdit/updateHomework',
        payload: { ...allFields },
      });
    }
  };

  const handleFieldsChange = () => {};

  return (
    <div style={{ padding: '20px 0' }}>
      <RouterPrompt when={when} />
      <CustomForm
        layout="horizontal"
        values={teacherHomeworkFields}
        formTypes={CUSTOM_FORM_TYPES.TwoColumn}
        loading={false}
        onFieldsChange={handleFieldsChange}
        formConfig={formConfig}
        onSubmit={handleSubmit}
      >
        <QuestionTable />
        <QuestionListModal record={{}}>
          <Button type="dashed" onClick={() => {}} style={{ width: '100%' }}>
            <Icon type="plus" /> 添加题目
          </Button>
        </QuestionListModal>
      </CustomForm>
    </div>
  );
};

const mapStateToProps = ({
  teacherHomeworkEdit,
  router,
}: {
  teacherHomeworkEdit: StateType;
  router: {
    location: Location;
  };
}) => ({
  teacherHomeworkEdit,
  location: router.location,
});

export default connect(mapStateToProps)(TeacherHomeworkEdit);
