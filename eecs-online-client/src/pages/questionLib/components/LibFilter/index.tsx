import React from 'react';
import { connect } from 'dva';
import FilterForm from '@/components/CustomForm';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import { FormItemComponentProps, UmiComponentProps } from '@/interfaces/components';
import { FilterFieldsModel } from '@/interfaces/questionLib';
import { StateType } from '../../models';
import { PAGINATION_CONFIGS } from '@/constants';

interface LibFilterProps extends UmiComponentProps {
  questionLib: StateType
}

const LibFilter: React.FC<LibFilterProps> = ({ questionLib, dispatch }) => {
  const { filterFields, courseIdDataSource, currentTabKey } = questionLib;

  const filterFormConfig: FormItemComponentProps[] = [
    {
      label: '题目内容',
      name: 'content',
      component: FORM_COMPONENT.Input,
      required: false,
    },
    {
      label: '课程名称',
      name: 'courseId',
      component: FORM_COMPONENT.Select,
      required: false,
      datasource: courseIdDataSource
    }
  ]

  const handleFieldsChange = (allFields: FilterFieldsModel) => {
    dispatch({
      type: 'questionLib/changeFilterFields',
      payload: {
        filterFields: allFields
      }
    })
  }

  const handleSubmit = (values: FilterFieldsModel) => {
    dispatch({
      type: 'questionLib/fetchQuestionLibPagination',
      payload: {
        data: {
          ...PAGINATION_CONFIGS,
          ...values,
          questionType: Number(currentTabKey)
        }
      },
    })
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
