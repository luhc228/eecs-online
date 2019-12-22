import React from 'react';
import { connect } from 'dva';
import { UmiComponentProps, FormItemComponentProps } from '@/interfaces/components';
import { StateType } from '../../models';
import FilterForm from '@/components/CustomForm';
import { HOMEWORK_STATUS, FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';


interface HomeworkFilterProps extends UmiComponentProps {
  studentHomework: StateType;
}

const homeworkStatusMap: { [key: string]: any } = {
  Done: '已完成',
  Undone: '未完成'
}

const filterFormConfig: FormItemComponentProps[] = [
  {
    label: '作业状态',
    name: 'status',
    component: FORM_COMPONENT.Select,
    required: false,
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
    required: false,
    // TODO: from backend api or localstorage
    datasource: [
      {
        value: '1',
        label: 'EECS实验课',
      },
    ],
  },
]

const HomeworkFilter: React.FC<HomeworkFilterProps> = ({
  dispatch,
  studentHomework,
}) => {
  const { filterFields } = studentHomework;

  const handleFilterFieldsChange = (allFields: object) => {
    console.log(allFields);
  }

  const handleFilterFieldsSubmit = (allFields: object) => {
    console.log(allFields);
  }


  return (
    <FilterForm
      values={filterFields}
      loading={false}
      formTypes={CUSTOM_FORM_TYPES.Filter}
      onFieldsChange={handleFilterFieldsChange}
      formConfig={filterFormConfig}
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
