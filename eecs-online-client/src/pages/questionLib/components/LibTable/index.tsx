import React from 'react';
import { connect } from 'dva';
import { Popconfirm } from 'antd';
import { ColumnProps } from 'antd/es/table';
import CustomTable from '@/components/CustomTable';
import { UmiComponentProps } from '@/interfaces/components';
import { questionListItem } from '@/interfaces/questionLib';
import { questionTypeMap } from '@/pages/questionLib';
import styles from './index.less';
import { StateType } from '../../models';

interface LibTableProps extends UmiComponentProps {
}

const LibTable: React.FC<LibTableProps> = ({ dispatch }) => {
  const handleEdit = (record: questionListItem) => {

  };

  const handleDelete = (id: string) => {

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
            onConfirm={() => {
              handleDelete(record.id)
            }}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <CustomTable
      loading={false}
      rowKey="id"
      columns={[]}
      dataSource={[]}
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

export default connect(mapStateToProps)(LibTable);
