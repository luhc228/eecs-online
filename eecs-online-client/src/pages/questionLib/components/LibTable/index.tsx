import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Popconfirm } from 'antd';
import { ColumnProps } from 'antd/es/table';
import umiRouter from 'umi/router';
import CustomTable from '@/components/CustomTable';
import { UmiComponentProps } from '@/interfaces/components';
import { questionListItem } from '@/interfaces/questionLib';
import { questionTypeMap } from '@/pages/questionLib';
import { PAGINATION_CONFIGS } from '@/constants';
import styles from './index.less';
import { StateType } from '../../models';

interface LibTableProps extends UmiComponentProps {
  loading: boolean,
}

const dataSource = [
  {
    id: 1,
    courseName: 'eecsee',
    questionType: 1,
    questionScore: '90',
    content: 'fjdlkjfajljlkfajlkfjjklf',
  }
]
const LibTable: React.FC<LibTableProps> = ({ dispatch, loading }) => {
  const handleEdit = (record: questionListItem) => {
    umiRouter.push({
      pathname: '/teacher/question-lib/edit',
      query: {
        id: record.id
      }
    })
  };

  const handleDelete = (id: string) => {
    dispatch({
      type: 'questionLib/removeQuestion',
      payload: { id },
    })
  };

  const columns: ColumnProps<questionListItem>[] = [
    { title: '课程名', dataIndex: 'courseName' },
    {
      title: '题目类型',
      dataIndex: 'questionType',
      render: (_: string, record: questionListItem) => (
        <span>{questionTypeMap[record.questionType]}</span>
      )
    },
    { title: '题目分数', dataIndex: 'questionScore' },
    { title: '题目内容', dataIndex: 'content' },
    {
      title: '操作',
      render: (_: string, record: questionListItem) => (
        <span className={styles.operation}>
          <span>
            <a onClick={() => handleEdit(record)}>查看</a>
          </span>
          <Popconfirm
            title="确定删除该班级"
            onConfirm={() => handleDelete(record.id)}
          >
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'questionLib/fetchQuestionLibPagination',
      payload: { ...PAGINATION_CONFIGS, },
    })
  }, []);
  return (
    <CustomTable
      loading={loading}
      rowKey={(record: questionListItem) => record.id}
      columns={columns}
      dataSource={dataSource}
      onPagination={(current: number) => {
        dispatch({
          type: 'questionLib/fetchQuestionLibPagination',
          payload: { ...PAGINATION_CONFIGS, page: current },
        })
      }}
    />
  )
}

const mapStateToProps = ({
  questionLib,
  loading,
}: {
  questionLib: StateType,
  loading: {
    effects: {
      [key: string]: boolean;
    };
  };
}) => ({
  questionLib,
  loading: loading.effects['questionLib/fetchQuestionLibPagination'],
});

export default connect(mapStateToProps)(LibTable);
