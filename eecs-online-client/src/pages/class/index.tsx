import { Dispatch } from 'redux';
import React, { useEffect } from 'react';
import router from 'umi/router';
import { Button, Popconfirm } from 'antd';
import { connect } from 'dva';
import { ColumnProps } from 'antd/es/table';
import { FormItemComponentProps } from '@/interfaces/components';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import { StateType } from './models';
import { ClassListItem } from '@/interfaces/class';
import { PAGINATION_CONFIGS } from '@/constants';
import styles from './index.less';
import FilterForm from '@/components/CustomForm';
import CustomTable from '@/components/CustomTable';

const filterFormConfig: FormItemComponentProps[] = [
  {
    label: '班级名称',
    name: 'courseClassName',
    component: FORM_COMPONENT.Input,
  },
  {
    label: '上课地点',
    name: 'courseName',
    component: FORM_COMPONENT.Input,
  },
]

interface ClassProps {
  dispatch: Dispatch<any>;
  fetchClassPaginationLoading: boolean;
  courseClass: StateType;
}

const CourseClass: React.FC<ClassProps> = props => {
  const {
    courseClass: {
      data: { page, total, list },
      filterFields,
    },
    fetchClassPaginationLoading,
    dispatch,
  } = props;

  useEffect(() => {
    dispatch({
      type: 'courseClass/fetchClassPagination',
      payload: { ...PAGINATION_CONFIGS },
    })
  }, []);

  const handleEdit = (allFields: ClassListItem) => {
    dispatch({
      type: 'courseClass/changeClassFields',
      payload: { data: allFields },
    })
    router.push('/teacher/class/edit');
  }

  const handleCreate = () => {
    router.push('/teacher/class/create');
  }

  const columns: ColumnProps<ClassListItem>[] = [
    { title: '班级名称', dataIndex: 'courseClassName' },
    { title: '所属课程', dataIndex: 'courseName' },
    { title: '学生人数', dataIndex: 'StudentTotal' },
    {
      title: '操作',
      render: (_: string, record: ClassListItem) => (
        <span className={styles.operation}>
          <span>
            <a onClick={() => handleEdit(record)}>编辑班级</a>
          </span>
          <Popconfirm
            title="确定删除该班级"
            onConfirm={() => {
              dispatch({
                type: 'courseClass/removeClass',
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
            type: 'courseClass/changeFilterFields',
            payload: { filterFields: allFields },
          })
        }}
        formConfig={filterFormConfig}
        onSubmit={value => dispatch({
          type: 'courseClass/fetchClassPagination',
          payload: { ...PAGINATION_CONFIGS, ...value },
        })}
      />
      <div className={styles.buttons}>
        <Button type="primary" onClick={handleCreate}>新增班级</Button>
      </div>
      <CustomTable
        loading={fetchClassPaginationLoading}
        columns={columns}
        dataSource={list}
        current={page}
        total={total}
        rowKey={(record: ClassListItem) => record.id}
        onPagination={(current: number) => {
          dispatch({
            type: 'courseClass/fetchClassPagination',
            payload: { ...PAGINATION_CONFIGS, page: current },
          })
        }}
      />
    </div>
  )
}

const mapStateToProps = ({
  courseClass,
  loading,
}: {
  courseClass: StateType;
  loading: {
    effects: {
      [key: string]: boolean;
    };
  };
}) => ({
  courseClass,
  fetchClassPaginationLoading: loading.effects['class/fetchClassPagination'],
})

export default connect(mapStateToProps)(CourseClass);
