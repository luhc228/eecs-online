import React from 'react';
import { connect } from 'dva';
import { ColumnProps } from 'antd/es/table';
import router from 'umi/router';
import CustomTable from '@/components/CustomTable';
import CustomCard from '@/components/CustomCard';
import FilterForm from '@/components/CustomForm';
import { CUSTOM_FORM_TYPES, FORM_COMPONENT, HOMEWORK_STATUS } from '@/enums';
import { StateType } from './models';
import { UmiComponentProps, FormItemComponentProps } from '@/interfaces/components';
import { PAGINATION_CONFIGS } from '@/constants';
import { studentHomeworkListItem } from '@/interfaces/studentHomework';

interface StudentHomeworkProps extends UmiComponentProps {
  loading: boolean;
  studentHomework: StateType;
}

const homeworkStatusMap = {
  [HOMEWORK_STATUS.Done]: '已完成',
  [HOMEWORK_STATUS.Undone]: '未完成'
}

const filterFormConfig: FormItemComponentProps[] = [
  {
    label: '作业状态',
    name: 'status',
    component: FORM_COMPONENT.Select,
    required: false,
    datasource: Object.entries(homeworkStatusMap).map((status) => {
      const [value, label] = status;
      return {
        value,
        label,
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

const StudentHomework: React.FC<StudentHomeworkProps> = ({
  dispatch,
  loading,
  studentHomework,
}) => {
  const { filterFields, data: { list, total, page } } = studentHomework;

  const handleFilterFieldsChange = (allFields: object) => {
    console.log(allFields);
  }

  const handleFilterFieldsSubmit = (allFields: object) => {
    console.log(allFields);
  }

  const handleEdit = (record: studentHomeworkListItem) => {
    router.push({
      pathname: '/student/homework/edit',
      query: {
        id: record.id
      }
    })
  }

  const handleDetail = () => {

  }

  const columns: ColumnProps<studentHomeworkListItem>[] = [
    // 课程名称、课程id、作业名称、作业id、作业总分、作业描述、作业开始时间、作业截止时间、状态
    { title: '作业名称', dataIndex: 'homeworkName' },
    { title: '课程名称', dataIndex: 'courseName' },
    { title: '作业描述', dataIndex: 'description' },
    { title: '作业总分', dataIndex: 'homeworkScore' },
    { title: '作业开始时间', dataIndex: 'startAt' },
    { title: '作业截止时间', dataIndex: 'endAt' },
    { title: '状态', dataIndex: 'status' },
    {
      title: '操作',
      render: (_: string, record: studentHomeworkListItem) => (
        record.status ? (
          <span>
            <a onClick={() => handleEdit(record)}>答题</a>
          </span>) : (
            <span>
              <a onClick={() => handleDetail()}>查看成绩</a>
            </span>
          )
      ),
    },
  ];

  return (
    <>
      <CustomCard>
        <FilterForm
          values={filterFields}
          loading={false}
          formTypes={CUSTOM_FORM_TYPES.Filter}
          onFieldsChange={handleFilterFieldsChange}
          formConfig={filterFormConfig}
          onSubmit={handleFilterFieldsSubmit}
        />
      </CustomCard>
      <CustomCard>
        <CustomTable
          loading={loading}
          columns={columns}
          dataSource={list}
          current={page}
          total={total}
          rowKey={(record: studentHomeworkListItem) => record.id}
          onPagination={(current: number) => {
            dispatch({
              type: 'studentHomework/fetchStudentHomeworkPagination',
              payload: { ...PAGINATION_CONFIGS, page: current },
            })
          }}
        />
      </CustomCard>
    </>
  )
}
const mapStateToProps = ({
  studentHomework,
  loading,
}: {
  studentHomework: StateType;
  loading: {
    effects: {
      [key: string]: boolean;
    };
  };
}) => ({
  studentHomework,
  loading: loading.effects['studentHomework/fetchStudentHomeworkPagination'],
})

export default connect(mapStateToProps)(StudentHomework);
