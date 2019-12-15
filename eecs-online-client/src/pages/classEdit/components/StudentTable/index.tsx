import React from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnProps } from 'antd/lib/table';
import TableFilter from '../TableFilter';

interface StudentTableProps {

}

const StudentTable: React.FC<StudentTableProps> = () => {
  const columns: ColumnProps<any>[] = [
    {
      dataIndex: 'college',
      title: '学院',
    },
    {
      dataIndex: 'studentClass',
      title: '班级',
    },
    {
      dataIndex: 'studentName',
      title: '学生姓名',
    },
    {
      dataIndex: 'studentId',
      title: '学号',
    },
    {
      dataIndex: 'operation',
      title: '操作',
      // render: () => {

      // }
    }
  ];

  return (
    <div>
      <TableFilter />
      <CustomTable
        loading={false}
        columns={columns}
        dataSource={[]}
        rowKey={record => record.studentId}
        onPagination={(current: number) => {
          console.log(current);
        }}
      />
    </div>
  )
}

export default StudentTable;
