import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'dva';
import TableTransfer from '@/components/TableTransfer';
import { StateType } from '../../models';
import { UmiComponentProps } from '@/interfaces/components';
import { StudentDetailModel } from '@/interfaces/classEdit';

export interface StudentDetailProps extends UmiComponentProps {
  classEdit: StateType
}

const StudentDetail: React.FC<StudentDetailProps> = ({
  classEdit,
  dispatch
}) => {
  const { studentList, targetKeys } = classEdit;

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
      dataIndex: 'studentGender',
      title: '性别',
    },
    {
      dataIndex: 'studentCollege',
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

  const handleChange = (nextTargetKeys: string[]) => {
    dispatch({
      type: 'classEdit/changeTargetKeys',
      payload: {
        targetKeys: nextTargetKeys
      }
    })
  }

  return (
    <TableTransfer
      dataSource={studentList}
      targetKeys={targetKeys}
      disabled={false}
      showSearch
      rowKey={(record: StudentDetailModel) => record.studentId}
      onChange={handleChange}
      filterOption={(inputValue, item) =>
        item.studentClass.indexOf(inputValue) !== -1 ||
        item.studentId.indexOf(inputValue) !== -1 ||
        item.studentName.indexOf(inputValue) !== -1 ||
        item.studentGender.indexOf(inputValue) !== -1
      }
      leftColumns={leftTableColumns}
      rightColumns={rightTableColumns}
    />
  )
}

const mapStateToProps = ({
  classEdit,
  loading
}: {
  classEdit: StateType,
  loading: any
}) => ({
  classEdit,
  loading: loading.effects['classEdit/fetchStudentDetail']
})

export default connect(mapStateToProps)(StudentDetail);
