/**
 * 课程信息新增和编辑共用页面
 */
import React from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import CustomForm from '@/components/CustomForm';
import { FormItemComponentProps } from '@/interfaces/components';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import RouterPrompt from '@/components/RouterPrompt';
import { StateType } from './models';
import CustomCard from '@/components/CustomCard';

interface CourseEditProps {
  courseEdit: StateType,
  dispatch: Dispatch<any>,
  location: Location,
  loading: boolean
}

const CourseEdit: React.FC<CourseEditProps> = ({ courseEdit, dispatch, location, loading }) => {
  const { courseFields, when, classIdDataSource } = courseEdit;

  const formConfig: FormItemComponentProps[] = [
    {
      label: '课程名称',
      name: 'courseName',
      component: FORM_COMPONENT.Input,
      required: true,
    },
    {
      label: '上课地点',
      name: 'courseLocation',
      component: FORM_COMPONENT.Input,
      required: true,
    },
    {
      label: '上课班级',
      name: 'classId',
      component: FORM_COMPONENT.Select,
      required: true,
      props: {
        mode: 'multiple',
      },
      datasource: classIdDataSource
    },
  ]

  const handleFieldsChange = (allFields: object) => {
    dispatch({
      type: 'courseEdit/changeCourseFields',
      payload: { data: allFields },
    })
  };

  const handleSubmit = (allFields: object) => {
    const isCreate = location.pathname.split('/')[3] === 'create';
    if (isCreate) {
      dispatch({
        type: 'courseEdit/createCourse',
        payload: { data: allFields },
      })
    } else {
      dispatch({
        type: 'courseEdit/updateCourse',
        payload: { data: { ...allFields, courseId: courseFields.courseId } },
      })
    }
  };

  return (
    <>
      <RouterPrompt when={when} />
      <CustomCard>
        <CustomForm
          layout="horizontal"
          values={courseFields}
          formTypes={CUSTOM_FORM_TYPES.OneColumn}
          loading={loading}
          onFieldsChange={handleFieldsChange}
          formConfig={formConfig}
          onSubmit={handleSubmit}
        />
      </CustomCard>
    </>
  )
};

const mapStateToProps = ({
  courseEdit,
  router,
  loading,
}: {
  courseEdit: StateType,
  router: {
    location: Location
  },
  loading: any
}) => ({
  courseEdit,
  location: router.location,
  loading: loading.models.courseEdit
});


export default connect(mapStateToProps)(CourseEdit);
