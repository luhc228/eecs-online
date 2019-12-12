import React, { useEffect } from 'react';
import { Button, Popconfirm } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect } from 'dva';
import router from 'umi/router';
import { Dispatch } from 'redux';
import CustomTable from '@/components/CustomTable';
import { CourseListItem } from '@/interfaces/course';
import styles from './index.less';
import { PAGINATION_CONFIGS } from '@/constants';
import FilterForm from '@/components/CustomForm';
import { StateType } from './models';
import { FormItemComponentProps } from '@/interfaces/components';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';

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
  fetchCoursePaginationLoading: boolean;
  course: StateType;
}

const Course: React.FC<CourseProps> = props => {
  const {
    course: {
      data: { page, total, list },
      filterFields,
    },
    fetchCoursePaginationLoading,
    dispatch,
  } = props;


  useEffect(() => {
    dispatch({
      type: 'course/fetchCoursePagination',
      payload: { ...PAGINATION_CONFIGS },
    })
  }, []);

  const handleEdit = (allFields: CourseListItem) => {
    dispatch({
      type: 'courseEdit/changeCourseFields',
      payload: { data: allFields },
    })
    router.push('/teacher/course/edit');
  }

  const handleCreate = () => {
    dispatch({
      type: 'courseEdit/changeCourseFields',
      payload: { data: {} },
    })
    router.push('/teacher/course/create');
  }

  const columns: ColumnProps<CourseListItem>[] = [
    { title: '课程名称', dataIndex: 'courseName' },
    { title: '上课地点', dataIndex: 'location' },
    { title: '上课班级', dataIndex: 'classNames' },
    {
      title: '操作',
      render: (_: string, record: CourseListItem) => (
        <span className={styles.operation}>
          <span>
            <a onClick={() => handleEdit(record)}>编辑课程</a>
          </span>
          <Popconfirm
            title="确定删除该课程"
            onConfirm={() => {
              dispatch({
                type: 'course/removeCourse',
                payload: { id: record.id },
              })
            }}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <FilterForm
        values={filterFields}
        loading={false}
        formTypes={CUSTOM_FORM_TYPES.Filter}
        onFieldsChange={(allFields: object) => {
          dispatch({
            type: 'course/changeFilterFields',
            payload: { filterFields: allFields },
          })
        }}
        formConfig={filterFormConfig}
        onSubmit={value => dispatch({
          type: 'course/fetchCoursePagination',
          payload: { ...PAGINATION_CONFIGS, ...value },
        })}
      />
      <div className={styles.buttons}>
        <Button type="primary" onClick={handleCreate}>新增课程</Button>
      </div>
      <CustomTable
        loading={fetchCoursePaginationLoading}
        columns={columns}
        dataSource={list}
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
    effects: {
      [key: string]: boolean;
    };
  };
}) => ({
  course,
  fetchCoursePaginationLoading: loading.effects['course/fetchCoursePagination'],
})

export default connect(mapStaetToProps)(Course);
