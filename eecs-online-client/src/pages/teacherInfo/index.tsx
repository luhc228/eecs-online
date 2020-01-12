import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import CustomForm from '@/components/CustomForm';
import { FormItemComponentProps } from '@/interfaces/components';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import RouterPrompt from '@/components/RouterPrompt';
import { StateType } from './models';
import CustomCard from '@/components/CustomCard';

interface TeacherInfoProps {
  teacherInfo: StateType;
  dispatch: Dispatch<any>;
  location: Location;
  loading: boolean;
}

const TeacherInfo: React.FC<TeacherInfoProps> = ({ teacherInfo, dispatch, location, loading }) => {
  const { teacherInfoFields, when, collegeIdDataSource } = teacherInfo;

  const formConfig: FormItemComponentProps[] = [
    {
      label: '用户名',
      name: 'teacherName',
      component: FORM_COMPONENT.Input,
      required: true,
    },
    {
      label: '工号',
      name: 'teacherId',
      component: FORM_COMPONENT.Input,
      required: true,
      props: {
        disabled: true,
      },
    },
    {
      label: '学院',
      name: 'teacherCollege',
      component: FORM_COMPONENT.Select,
      required: true,
      props: {
        selectMode: 'multiple',
      },
      datasource: collegeIdDataSource,
    },
    {
      label: '性别',
      name: 'teacherGender',
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
    console.log('submit', allFields);
    dispatch({
      type: 'teacherInfo/updateTeacherInfo',
      payload: { data: { ...allFields, teacherId: teacherInfoFields.teacherId } },
    });
    // console.log('teacherInfoFields', teacherInfoFields)
    // dispatch({
    //   type: 'teacherInfo/fetchInfoFields',
    //   payload: {
    //     data: {
    //       ...teacherInfoFields,
    //     },
    //   },
    // });
  };

  return (
    <>
      <RouterPrompt when={when} />
      <CustomCard title="个人信息编辑">
        <CustomForm
          layout="horizontal"
          values={teacherInfoFields}
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
  teacherInfo,
  router,
  loading,
}: {
  teacherInfo: StateType;
  router: {
    location: Location;
  };
  loading: any;
}) => ({
  teacherInfo,
  location: router.location,
  loading: loading.models.teacherInfo,
});

export default connect(mapStateToProps)(TeacherInfo);
