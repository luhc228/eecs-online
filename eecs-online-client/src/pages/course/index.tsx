import React from 'react';
import { Button } from 'antd';
import { ColumnProps } from 'antd/es/table';
import CustomTable from '@/components/CustomTable';
import { CourseTableModel } from '@/interfaces/course';
import { ButtonProps } from '@/interfaces/component';
import EditModal from './components/EditModal';
import styles from './index.less';

const columns: ColumnProps<CourseTableModel>[] = [
  { title: '课程名称', dataIndex: 'courseName' },
  { title: '上课地点', dataIndex: 'location' },
  { title: '上课时间', dataIndex: 'time' },
  { title: '上课班级', dataIndex: 'className' },
  {
    title: '操作',
    render: (_: string, record: CourseTableModel) => (
      <span className={styles.operation}>
        <EditModal record={record} onOk={() => { }}>
          <a>编辑课程</a>
        </EditModal>
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
    <div>
      <div className={styles.buttons}>
        <EditModal record={{}} onOk={() => { }}>
          <Button type="primary">新增课程</Button>
        </EditModal>
      </div>
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
    </div>

  )
}

export default Course;
