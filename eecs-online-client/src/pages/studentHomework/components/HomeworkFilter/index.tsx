import React from 'react';
import { connect } from 'dva';
import { UmiComponentProps, FormItemComponentProps, SelectComponentDatasourceModel } from '@/interfaces/components';
import { StateType } from '../../models';
import FilterForm from '@/components/CustomForm';
import { HOMEWORK_STATUS, FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import { PAGINATION_CONFIGS } from '@/constants';


interface HomeworkFilterProps extends UmiComponentProps {
  studentHomework: StateType;
}

const homeworkStatusMap: { [key: string]: any } = {
  Done: '已完成',
  Undone: '未完成'
}

const getFilterFormConfig = (courseIdDataSource: SelectComponentDatasourceModel[]): FormItemComponentProps[] => [
  {
    label: '作业状态',
    name: 'status',
    component: FORM_COMPONENT.Select,
    required: false,
    props: {
      allowClear: true,
    },
    datasource: Object.entries(HOMEWORK_STATUS).slice(2).map((status) => {
      const [label, value] = status;
      return {
        value,
        label: homeworkStatusMap[label],
      }
    }),
  },
  {
    label: '课程名称',
    name: 'courseId',
    component: FORM_COMPONENT.Select,
    props: {
      allowClear: true,
    },
    required: false,
    datasource: courseIdDataSource
  },
]

const HomeworkFilter: React.FC<HomeworkFilterProps> = ({
  dispatch,
  studentHomework,
}) => {
  const { filterFields, courseIdDataSource } = studentHomework;

  const handleFilterFieldsChange = (allFields: object) => {
    dispatch({
      type: 'studentHomework/changeFilterFields',
      payload: {
        filterFields: allFields,
      }
    })
  }

  const handleFilterFieldsSubmit = (allFields: object) => {
    dispatch({
      type: 'studentHomework/fetchStudentHomeworkPagination',
      payload: {
        data: {
          ...PAGINATION_CONFIGS,
          ...allFields
        }
      }
    })
  }


  return (
    <FilterForm
      resetFieldsVisible={false}
      values={filterFields}
      loading={false}
      formTypes={CUSTOM_FORM_TYPES.Filter}
      onFieldsChange={handleFilterFieldsChange}
      formConfig={getFilterFormConfig(courseIdDataSource)}
      onSubmit={handleFilterFieldsSubmit}
    />
  )
}

const mapStateToProps = ({
  studentHomework,
}: {
  studentHomework: StateType;
}) => ({
  studentHomework,
})

export default connect(mapStateToProps)(HomeworkFilter);
