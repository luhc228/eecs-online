/**
 * 课程信息新增和编辑共用页面
 */
import React from 'react';
import CustomForm from '@/components/CustomForm';
import { FormItemComponentProps } from '@/interfaces/components';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';

interface CourseEditProps {

}

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
    component: FORM_COMPONENT.Input,
  },
]

const CourseEdit: React.FC<CourseEditProps> = () => (
  <div>
    <CustomForm
      layout="horizontal"
      values={{}}
      formTypes={CUSTOM_FORM_TYPES.Common}
      loading={false}
      onFieldsChange={(allFields: object) => { console.log(allFields) }}
      formConfig={formConfig}
      onSubmit={value => { console.log(value) }}
    >

    </CustomForm>
  </div>
)

export default CourseEdit;
