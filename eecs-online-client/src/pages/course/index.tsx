import React, { useEffect } from 'react';
import { Button, Popconfirm } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import CustomTable from '@/components/CustomTable';
import { CourseListItem } from '@/interfaces/course';
import EditModal from './components/EditModal';
import styles from './index.less';
import { PAGINATION_CONFIGS } from '@/constants';
import CustomFilter from '@/components/CustomFilter';
import { StateType } from './models';
import { FormItemComponentProps } from '@/interfaces/components';
import { FORM_COMPONENT } from '@/enums';

const columns: ColumnProps<CourseListItem>[] = [
  { title: '课程名称', dataIndex: 'courseName' },
  { title: '上课地点', dataIndex: 'location' },
  { title: '上课时间', dataIndex: 'time' },
  { title: '上课班级', dataIndex: 'classNames' },
  {
    title: '操作',
    render: (_: string, record: CourseListItem) => (
      <span className={styles.operation}>
        <EditModal title="编辑课程" record={record} onOk={() => { }}>
          <a>编辑课程</a>
        </EditModal>
        <Popconfirm title="确定删除该课程" onConfirm={() => { }}>
          <a href="">删除</a>
        </Popconfirm>
      </span>
    ),
  },
];

const filterFormConfig: FormItemComponentProps[] = [
  {
    label: '课程名称',
    name: 'courseName',
    component: FORM_COMPONENT.Input,
  },
  {
    label: '上课地点',
    name: 'location',
    component: FORM_COMPONENT.Input,
  },
  {
    label: '上课班级',
    name: 'classNames',
    component: FORM_COMPONENT.Input,
  },
]

interface CourseProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  course: StateType;
}

const Course: React.FC<CourseProps> = props => {
  const { course: { data: { page, total, courseList } }, loading, dispatch } = props;


  useEffect(() => {
    dispatch({
      type: 'course/fetchCoursePagination',
      payload: { ...PAGINATION_CONFIGS },
    })
  }, []);
  return (
    <div>
      <CustomFilter
        filterValues={{}}
        loading={loading}
        onFieldsChange={(allFields: object) => { console.log(allFields) }}
        formConfig={filterFormConfig}
        onSubmit={value => { console.log(value) }}
      />
      <div className={styles.buttons}>
        <EditModal title="新增课程" record={{}} onOk={() => { }}>
          <Button type="primary">新增课程</Button>
        </EditModal>
      </div>
      <CustomTable
        loading={loading}
        columns={columns}
        dataSource={courseList}
        current={page}
        total={total}
        rowKey={(record: CourseListItem) => record.id}
        onPagination={(current: number) => {
          dispatch({
            type: 'course/fetchCoursePagination',
            payload: { ...PAGINATION_CONFIGS, page: current },
          })
        }}
      />
    </div>
  )
}

const mapStaetToProps = ({
  course,
  loading,
}: {
  course: StateType;
  loading: {
    models: {
      [key: string]: boolean;
    };
  };
}) => ({
  course,
  loading: loading.models.course,
})

export default connect(mapStaetToProps)(Course);
