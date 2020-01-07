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
import CustomCard from '@/components/CustomCard';
import { removeEmpty } from '@/utils';

const filterFormConfig: FormItemComponentProps[] = [
  {
    label: '班级名称',
    name: 'className',
    component: FORM_COMPONENT.Input,
    required: false,
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
      payload: { data: { ...PAGINATION_CONFIGS } },
    })
  }, []);

  const handleEdit = (classId: number) => {
    router.push({
      pathname: '/teacher/class/edit',
      query: {
        classId
      }
    });
  }

  const handleCreate = () => {
    router.push('/teacher/class/create');
  }

  const handleDelete = (classId: number) => {
    dispatch({
      type: 'courseClass/removeClass',
      payload: { classId },
    })
  }

  const columns: ColumnProps<ClassListItem>[] = [
    { title: '班级名称', dataIndex: 'className' },
    { title: '学生人数', dataIndex: 'studentNum' },
    {
      title: '操作',
      render: (_: string, record: ClassListItem) => (
        <span className={styles.operation}>
          <span>
            <a onClick={() => handleEdit(record.classId)}>编辑班级</a>
          </span>
          <Popconfirm
            title="确定删除该班级"
            onConfirm={() => {
              handleDelete(record.classId)
            }}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <>
      <CustomCard>
        <FilterForm
          values={filterFields}
          loading={false}
          formTypes={CUSTOM_FORM_TYPES.Filter}
          onFieldsChange={(allFields: object) => {
            dispatch({
              type: 'courseClass/changeFilterFields',
              payload: { filterFields: removeEmpty(allFields) },
            })
          }}
          formConfig={filterFormConfig}
          onSubmit={value => dispatch({
            type: 'courseClass/fetchClassPagination',
            payload: {
              data: {
                ...PAGINATION_CONFIGS,
                ...value
              }
            },
          })}
        />
      </CustomCard>

      <CustomCard
        title="班级信息列表"
        extra={
          <Button type="primary" onClick={handleCreate}>新增班级</Button>}
      >
        <CustomTable
          loading={fetchClassPaginationLoading}
          columns={columns}
          dataSource={list}
          current={page}
          total={total}
          rowKey={(record: ClassListItem) => record.classId.toString()}
          onPagination={(current: number) => {
            dispatch({
              type: 'courseClass/fetchClassPagination',
              payload: {
                data: {
                  ...PAGINATION_CONFIGS,
                  page: current
                }
              },
            })
          }}
        />
      </CustomCard>

    </>
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
  fetchClassPaginationLoading: loading.effects['courseClass/fetchClassPagination'],
})

export default connect(mapStateToProps)(CourseClass);
