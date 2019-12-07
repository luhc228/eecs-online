/**
 * 班级信息新增和编辑共用页面
 */
import React from 'react';
import CustomForm from '@/components/CustomForm';
import { FormItemComponentProps } from '@/interfaces/components';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';

interface ClassEditProps {

}

const formConfig: FormItemComponentProps[] = [
  {
    label: '班级名称',
    name: 'className',
    component: FORM_COMPONENT.Input,
  },
  {
    label: '课程名称',
    name: 'courseName',
    component: FORM_COMPONENT.Input,
  },
  {
    label: '学生姓名',
    name: 'studentName',
    component: FORM_COMPONENT.Select,
  },
]

const ClassEdit: React.FC<ClassEditProps> = () => (
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

export default ClassEdit;
