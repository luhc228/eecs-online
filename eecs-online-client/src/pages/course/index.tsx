import React from 'react';
import { ColumnProps } from 'antd/es/table';
import CustomTable from '@/components/CustomTable';
import { CourseTableModel } from '@/interfaces/course';
import { ButtonProps } from '@/interfaces/component';

const columns: ColumnProps<CourseTableModel>[] = [
  { title: '课程名称', dataIndex: 'courseName' },
  { title: '上课地点', dataIndex: 'location' },
  { title: '上课时间', dataIndex: 'time' },
  { title: '上课班级', dataIndex: 'className' },
  {
    title: '操作',
    render: (_: string, record: CourseTableModel) => (
      <span>

      </span>
    ),
  },
];

const buttons: ButtonProps[] = []

const Course: React.FC = () => {
  const dataSource: any[] = [

  ]
  const page = 1
  const total = 10
  return (
    <CustomTable
      loading={false}
      columns={columns}
      dataSource={dataSource}
      current={page}
      total={total}
      rowKey={(record: CourseTableModel) => record.id}
      buttons={buttons}
      onPagination={(current: number) => {
        console.log(current);
      }}
    />
  )
}

export default Course;
