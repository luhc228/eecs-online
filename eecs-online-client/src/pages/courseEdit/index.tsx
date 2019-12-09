/**
 * 课程信息新增和编辑共用页面
 */
import React from 'react';
import { connect } from 'dva';
import CustomForm from '@/components/CustomForm';
import { FormItemComponentProps } from '@/interfaces/components';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import RouterPrompt from '@/components/RouterPrompt';
import { StateType } from './models';

interface CourseEditProps {
  courseEdit: StateType;
}


const CourseEdit: React.FC<CourseEditProps> = ({ courseEdit }) => {
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
      datasource: [
        {
          value: '通信1班',
          label: '通信1班',
        },
      ],
    },
    {
      label: '上课时间',
      name: 'time',
      component: FORM_COMPONENT.DynamicFieldSet,
    },
  ]
  const { courseFields } = courseEdit;
  console.log(courseFields)
  return (
    <div style={{ padding: 30 }}>
      <RouterPrompt />
      <CustomForm
        layout="horizontal"
        values={courseFields}
        formTypes={CUSTOM_FORM_TYPES.ONE_COLUMN}
        loading={false}
        onFieldsChange={(allFields: object) => { console.log(allFields) }}
        formConfig={formConfig}
        onSubmit={allFields => { console.log(allFields) }}
      >
      </CustomForm>
    </div>
  )
}

const mapStaetToProps = ({
  courseEdit,
}: {
  courseEdit: StateType;
}) => ({
  courseEdit,
})


export default connect(mapStaetToProps)(CourseEdit);
