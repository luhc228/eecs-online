import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import FilterForm from '@/components/CustomForm';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import { FormItemComponentProps, UmiComponentProps } from '@/interfaces/components';
import { FilterFieldsModel } from '@/interfaces/questionLib';
import { StateType } from '../../models';

interface LibFilterProps {
  dispatch: Dispatch<any>;
}

const filterFormConfig: FormItemComponentProps[] = [
  {
    label: '题目内容',
    name: 'content',
    component: FORM_COMPONENT.Input,
    required: false,
  },
]


interface LibFilterProps extends UmiComponentProps {
  questionLib: StateType
}

const LibFilter: React.FC<LibFilterProps> = ({ questionLib, dispatch }) => {
  const { filterFields } = questionLib;

  const handleFieldsChange = (allFields: FilterFieldsModel) => {
    dispatch({

    })
  }

  const handleSubmit = (values: FilterFieldsModel) => {

  }

  return (
    <FilterForm
      values={filterFields}
      loading={false}
      formTypes={CUSTOM_FORM_TYPES.Filter}
      onFieldsChange={handleFieldsChange}
      formConfig={filterFormConfig}
      onSubmit={handleSubmit}
    />
  )
}

const mapStateToProps = ({
  questionLib
}: {
  questionLib: StateType
}) => ({
  questionLib
});

export default connect(mapStateToProps)(LibFilter);
