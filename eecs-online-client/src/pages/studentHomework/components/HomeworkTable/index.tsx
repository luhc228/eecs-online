import React, { useEffect } from 'react';
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
  const { data: { list, total, page }, filterFields } = studentHomework;

  const handleEdit = (record: studentHomeworkListItem) => {
    router.push({
      pathname: '/student/homework/edit',
      query: {
        homeworkId: record.homeworkId
      }
    })
  }

  const handleDetail = (record: studentHomeworkListItem) => {
    router.push({
      pathname: '/student/homework/detail',
      query: {
        homeworkId: record.homeworkId
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
        <StatusColumn text={value === HOMEWORK_STATUS.Undone ? '未完成' : '已完成'} status={!value} />
      )
    },
    {
      title: '操作',
      render: (_: string, record: studentHomeworkListItem) => (
        record.status ? (
          <span>
            <a onClick={() => handleDetail(record)}>查看成绩</a>
          </span>) : (
            <span>
              <a onClick={() => handleEdit(record)}>答题</a>
            </span>
          )
      ),
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'studentHomework/fetchStudentHomeworkPagination',
      payload: {
        data: {
          ...PAGINATION_CONFIGS,
          ...filterFields,
        }
      }
    })
  }, [])
  return (
    <CustomTable
      loading={loading}
      columns={columns}
      dataSource={list}
      current={page}
      total={total}
      rowKey={(record: studentHomeworkListItem) => record.homeworkId.toString()}
      onPagination={(current: number) => {
        dispatch({
          type: 'studentHomework/fetchStudentHomeworkPagination',
          payload: {
            data: {
              ...PAGINATION_CONFIGS,
              ...filterFields,
              page: current
            }
          },
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
