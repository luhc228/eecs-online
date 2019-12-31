import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import CustomTable from '@/components/CustomTable';
import TableFilter from '../TableFilter';

interface QuestionTableProps {}

const QuestionTable: React.FC<QuestionTableProps> = () => {
  const columns: ColumnProps<any>[] = [
    // {
    //   dataIndex: 'questionId',
    //   title: '问题编号',
    // },
    {
      dataIndex: 'courseId',
      title: '所属课程',
    },
    {
      dataIndex: 'content',
      title: '题目内容',
    },
    {
      dataIndex: 'questionType',
      title: '题目类型',
    },
    {
      dataIndex: 'questionScore',
      title: '题目分值',
    },
    {
      dataIndex: 'operation',
      title: '操作',
      // render: () => {

      // }
    },
  ];

  return (
    <div>
      <TableFilter />
      <CustomTable
        loading={false}
        columns={columns}
        dataSource={[]}
        rowKey={record => record.questionId}
        onPagination={(current: number) => {
          console.log(current);
        }}
      />
    </div>
  );
};

export default QuestionTable;
