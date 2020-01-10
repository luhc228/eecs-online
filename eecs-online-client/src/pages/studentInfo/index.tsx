import React from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import CustomForm from '@/components/CustomForm';
import { FormItemComponentProps } from '@/interfaces/components';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import RouterPrompt from '@/components/RouterPrompt';
import { StateType } from './models';
import CustomCard from '@/components/CustomCard';

interface StudentInfoProps {
  studentInfo: StateType;
  dispatch: Dispatch<any>;
  location: Location;
  loading: boolean;
}

const StudentInfo: React.FC<StudentInfoProps> = ({ studentInfo, dispatch, location, loading }) => {
  const { studentInfoFields, when, collegeIdDataSource, classIdDataSource } = studentInfo;

  const formConfig: FormItemComponentProps[] = [
    {
      label: '用户名',
      name: 'studentName',
      component: FORM_COMPONENT.Input,
      required: true,
    },
    {
      label: '学号',
      name: 'studentId',
      component: FORM_COMPONENT.Input,
      required: true,
    },
    {
      label: '学院',
      name: 'studentCollege',
      component: FORM_COMPONENT.Select,
      required: true,
      props: {
        selectMode: 'multiple',
      },
      datasource: collegeIdDataSource,
    },
    {
      label: '班级',
      name: 'studentClass',
      component: FORM_COMPONENT.Select,
      required: true,
      props: {
        selectMode: 'multiple',
      },
      datasource: classIdDataSource,
    },
    {
      label: '性别',
      name: 'studentGender',
      component: FORM_COMPONENT.Radio,
      required: true,
      props: {
        mode: 'multiple',
      },
      datasource: [
        { label: '男', value: '男' },
        { label: '女', value: '女' },
      ],
    },
  ];

  const handleSubmit = (allFields: object) => {
    dispatch({
      type: 'studentInfo/updateStudentInfo',
      payload: { data: { ...allFields, studentId: studentInfoFields.studentId } },
    });
  };

  return (
    <>
      <RouterPrompt when={when} />
      <CustomCard title="个人信息编辑">
        <CustomForm
          layout="horizontal"
          values={studentInfoFields}
          formTypes={CUSTOM_FORM_TYPES.OneColumn}
          loading={loading}
          // TODO: bug: when add this fieldsChange function the error will disappear
          onFieldsChange={() => {}}
          formConfig={formConfig}
          onSubmit={handleSubmit}
        />
      </CustomCard>
    </>
  );
};

const mapStateToProps = ({
  studentInfo,
  router,
  loading,
}: {
  studentInfo: StateType;
  router: {
    location: Location;
  };
  loading: any;
}) => ({
  studentInfo,
  location: router.location,
  loading: loading.models.studentInfo,
});

export default connect(mapStateToProps)(StudentInfo);
