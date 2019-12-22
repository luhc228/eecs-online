import React from 'react';
import { connect } from 'dva';
import { ColumnProps } from 'antd/es/table';
import router from 'umi/router';
import CustomTable from '@/components/CustomTable';
import { HOMEWORK_STATUS } from '@/enums';
import { StateType } from '../../models';
import { UmiComponentProps } from '@/interfaces/components';
import { PAGINATION_CONFIGS } from '@/constants';
import { studentHomeworkListItem } from '@/interfaces/studentHomework';
import StatusColumn from '@/components/StatusColumn';

interface HomeworkTableProps extends UmiComponentProps {
  loading: boolean;
  studentHomework: StateType;
}

const HomeworkTable: React.FC<HomeworkTableProps> = ({
  dispatch,
  loading,
  studentHomework,
}) => {
  const { data: { list, total, page } } = studentHomework;

  const dataSource = [
    {
      id: 1,
      homeworkName: 'eecs第一次作业',
      courseName: '课程名称',
      description: '描述',
      homeworkScore: '200',
      startAt: '2019-08-09 08:10',
      endAt: '2019-08-09 09:20',
      status: 1
    },
    {
      id: 2,
      homeworkName: 'eecs第二次作业',
      courseName: '课程名称',
      description: '描述',
      homeworkScore: '200',
      startAt: '2019-08-10 08:10',
      endAt: '2019-08-10 09:20',
      status: 0
    }
  ]
  const handleEdit = (record: studentHomeworkListItem) => {
    router.push({
      pathname: '/student/homework/edit',
      query: {
        id: record.id
      }
    })
  }

  const handleDetail = (record: studentHomeworkListItem) => {
    router.push({
      pathname: '/student/homework/detail',
      query: {
        id: record.id
      }
    })
  }

  const columns: ColumnProps<studentHomeworkListItem>[] = [
    { title: '作业名称', dataIndex: 'homeworkName' },
    { title: '课程名称', dataIndex: 'courseName' },
    { title: '作业描述', dataIndex: 'description' },
    { title: '作业总分', dataIndex: 'homeworkScore' },
    { title: '作业开始时间', dataIndex: 'startAt' },
    { title: '作业截止时间', dataIndex: 'endAt' },
    {
      title: '状态',
      dataIndex: 'status',
      render: (value: number) => (
        <StatusColumn text={value === HOMEWORK_STATUS.Undone ? '未完成' : '已完成'} status={!!value} />
      )
    },
    {
      title: '操作',
      render: (_: string, record: studentHomeworkListItem) => (
        record.status ? (
          <span>
            <a onClick={() => handleEdit(record)}>答题</a>
          </span>) : (
            <span>
              <a onClick={() => handleDetail(record)}>查看成绩</a>
            </span>
          )
      ),
    },
  ];

  return (
    <CustomTable
      loading={loading}
      columns={columns}
      dataSource={dataSource}
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

export default connect(mapStateToProps)(HomeworkTable);
