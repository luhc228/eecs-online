import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import CustomForm from '@/components/CustomForm';
import { FormItemComponentProps } from '@/interfaces/components';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import RouterPrompt from '@/components/RouterPrompt';
import { StateType } from './models';
import CustomCard from '@/components/CustomCard';

interface DetailEditProps {
  teacherHomeworkDetailEdit: StateType;
  dispatch: Dispatch<any>;
  location: Location;
  loading: boolean;
}

const TeacherHomeworkDetailEdit: React.FC<DetailEditProps> = ({
  teacherHomeworkDetailEdit,
  dispatch,
  location,
  loading,
}) => {
  const { detailFields, when } = teacherHomeworkDetailEdit;

  const formConfig: FormItemComponentProps[] = [
    {
      label: '学生得分',
      name: 'questionScore',
      component: FORM_COMPONENT.Input,
      required: true,
    },
  ];

  const handleFieldsChange = (allFields: object) => {
    // console.log('allFields', questionScore)
    dispatch({
      type: 'teacherHomeworkDetailEdit/changeDetailFields',
      payload: { data: allFields },
    });
  };

  const handleSubmit = (allFields: object) => {
    console.log(allFields);
    dispatch({
      type: 'teacherHomeworkDetailEdit/updateTeacherHomeworkDetail',
      payload: {
        data: {
          allFields,
          questionId: detailFields.questionId,
          homeworkId: detailFields.homeworkId,
          studentId: detailFields.studentId,
        },
      },
    });
  };

  return (
    <>
      <RouterPrompt when={when} />
      <CustomCard>
        <CustomForm
          layout="horizontal"
          values={detailFields}
          formTypes={CUSTOM_FORM_TYPES.OneColumn}
          loading={loading}
          // TODO: bug: when add this fieldsChange function the error will disappear
          onFieldsChange={handleFieldsChange}
          formConfig={formConfig}
          onSubmit={handleSubmit}
        />
      </CustomCard>
    </>
  );
};

const mapStateToProps = ({
  teacherHomeworkDetailEdit,
  router,
  loading,
}: {
  teacherHomeworkDetailEdit: StateType;
  router: {
    location: Location;
  };
  loading: any;
}) => ({
  teacherHomeworkDetailEdit,
  location: router.location,
  loading: loading.models.teacherHomeworkDetailEdit,
});

export default connect(mapStateToProps)(TeacherHomeworkDetailEdit);
