/**
 * 课程信息新增和编辑共用页面
 */
import React from 'react';
import CustomForm from '@/components/CustomForm';
import { FormItemComponentProps } from '@/interfaces/components';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';

interface CourseEditProps {
  values: object;
}


const CourseEdit: React.FC<CourseEditProps> = ({ values }) => {
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
  ]
  return (
    <div style={{ padding: 30 }}>
      <CustomForm
        layout="horizontal"
        values={values}
        formTypes={CUSTOM_FORM_TYPES.Common}
        loading={false}
        onFieldsChange={(allFields: object) => { console.log(allFields) }}
        formConfig={formConfig}
        onSubmit={allFields => { console.log(allFields) }}
      >
      </CustomForm>
    </div>
  )
}

export default CourseEdit;
