/**
 * 班级信息查看、新增和编辑共用页面
 */
import React from 'react';
import { connect } from 'dva';
import CustomForm from '@/components/CustomForm';
import { FormItemComponentProps } from '@/interfaces/components';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import RouterPrompt from '@/components/RouterPrompt';
// import { StateType } from './models';

interface ClassEditProps {
  // classEdit: StateType;
}


const ClassEdit: React.FC<ClassEditProps> = ({ classEdit }) => {
  const formConfig: FormItemComponentProps[] = [
    {
      label: '班级名称',
      name: 'courseClassName',
      component: FORM_COMPONENT.Input,
    },
    {
      label: '课程名称',
      name: 'courseName',
      component: FORM_COMPONENT.Input,
    },
    {
      label: '',
      name: '',
      component: FORM_COMPONENT.Select,

    },
  ]

  return (
    <div>
      fff
    </div>
  )
}

export default ClassEdit;
