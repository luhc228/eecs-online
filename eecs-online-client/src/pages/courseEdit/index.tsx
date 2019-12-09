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

interface CourseEditProps {
  courseEdit: StateType,
  dispatch: Dispatch<any>,
  location: Location
}


const CourseEdit: React.FC<CourseEditProps> = ({ courseEdit, dispatch, location }) => {
  const formConfig: FormItemComponentProps[] = [
    {
      label: '课程名称',
      name: 'courseName',
      component: FORM_COMPONENT.Input,
    },
    {
      label: '上课地点',
      name: 'location',
      component: FORM_COMPONENT.Input,
    },
    {
      label: '上课班级',
      name: 'classNames',
      component: FORM_COMPONENT.Select,
      selectMode: 'multiple',
      // TODO: from backend api
      datasource: [
        {
          value: '通信1班',
          label: '通信1班',
        },
      ],
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
        payload: { ...allFields },
      })
    } else {
      dispatch({
        type: 'courseEdit/updateCourse',
        payload: { ...allFields },
      })
    }
  };

  const { courseFields, when } = courseEdit;
  return (
    <div style={{ padding: '50px 0' }}>
      <RouterPrompt when={when} />
      <CustomForm
        layout="horizontal"
        values={courseFields}
        formTypes={CUSTOM_FORM_TYPES.ONE_COLUMN}
        loading={false}
        onFieldsChange={handleFieldsChange}
        formConfig={formConfig}
        onSubmit={handleSubmit}
      >
      </CustomForm>
    </div>
  )
};

const mapStateToProps = ({
  courseEdit,
  router,
}: {
  courseEdit: StateType,
  router: {
    location: Location
  },
}) => ({
  courseEdit,
  location: router.location,
});


export default connect(mapStateToProps)(CourseEdit);
