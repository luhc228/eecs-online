import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import TableTransfer from '@/components/TableTransfer';

const mockData: any[] = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 4 === 0,
  });
}

const StudentDetail: React.FC<{}> = () => {
  const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

  const leftTableColumns: ColumnProps<any>[] = [
    {
      dataIndex: 'studentName',
      title: '学生姓名',
    },
    {
      dataIndex: 'studentClass',
      title: '班级',
    },
    {
      dataIndex: 'studentId',
      title: '学生学号',
    },
    {
      dataIndex: 'gender',
      title: '性别',
    },
    {
      dataIndex: 'college',
      title: '学院',
    },
  ];

  const rightTableColumns: ColumnProps<any>[] = [
    {
      dataIndex: 'studentName',
      title: '学生姓名',
    },
    {
      dataIndex: 'studentClass',
      title: '班级',
    },
    {
      dataIndex: 'studentId',
      title: '学生学号',
    },
  ]

  const handleChange = (nextTargetKeys: any[]) => {
    console.log(nextTargetKeys);
  }

  return (
    <TableTransfer
      dataSource={mockData}
      targetKeys={originTargetKeys}
      disabled={false}
      showSearch
      onChange={handleChange}
      filterOption={(inputValue, item) =>
        item.studentClass.indexOf(inputValue) !== -1 || item.studentId.indexOf(inputValue) !== -1
      }
      leftColumns={leftTableColumns}
      rightColumns={rightTableColumns}
    />
  )
}

export default StudentDetail;
