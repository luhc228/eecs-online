import React from 'react';
import { Dispatch } from 'redux';
import FilterForm from '@/components/CustomForm';
import { connect } from 'dva';
import { FORM_COMPONENT } from '@/enums';
import { FormItemComponentProps } from '@/interfaces/components';

const filterFormConfig: FormItemComponentProps[] = [
  {
    label: '题目内容',
    name: 'content',
    component: FORM_COMPONENT.Input,
    required: false,
  },
]

const LibFilter: React.FC<{}> = () => {
  console.log(123123123);
  return (
    
  )
}

const mapStateToProps = ({

}) => ({

});

export default connect(mapStateToProps)(LibFilter);
