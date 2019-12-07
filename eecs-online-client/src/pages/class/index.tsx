import React, { useEffect } from 'react';
import { Button, Popconfirm } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect } from 'dva';
import router from 'umi/router';
import { Dispatch } from 'redux';
import CustomTable from '@/components/CustomTable';
import { ClassListItem } from '@/interfaces/class';
import styles from './index.less';
import { PAGINATION_CONFIGS } from '@/constants';
import FilterForm from '@/components/CustomForm';
import { StateType } from './models';
import { FormItemComponentProps } from '@/interfaces/components';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';

const columns: ColumnProps<ClassListItem>[] = [
  { title: '虚拟班级名称', dataIndex: 'classNames' },
  { title: '课程名称', dataIndex: 'coureName' },
  { title: '学生总人数', dataIndex: 'studentTotal' },
  {
    title: '操作',
    render: (_: string, record: ClassListItem) => (
      <span className={styles.operation}>
        {/* <EditModal title="编辑班级" record={record} onOk={() => router.push('/teacher/class/edit')}>
          <a>编辑班级</a>
        </EditModal> */}
        <span>
          <a onClick={() => router.push('/teacher/class/edit')}>编辑班级</a>
        </span>

        <Popconfirm
          title="确定删除该班级"
          onConfirm={() => {
            console.log(record);
          }}>
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
    label: '班级名称',
    name: 'classNames',
    component: FORM_COMPONENT.Input,
  },
  {
    label: '学生学号',
    name: 'studentNumbers',
    component: FORM_COMPONENT.InputNumber,
  },
]

interface ClassProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  class: StateType;
}

const Class: React.FC<ClassProps> = props => {
  const { class: { data: { page, total, classList } }, loading, dispatch } = props;


  useEffect(() => {
    dispatch({
      type: 'class/fetchClassPagination',
      payload: { ...PAGINATION_CONFIGS },
    })
  }, []);
  return (
    <div>
      <FilterForm
        values={{}}
        loading={loading}
        formTypes={CUSTOM_FORM_TYPES.Filter}
        onFieldsChange={(allFields: object) => { console.log(allFields) }}
        formConfig={filterFormConfig}
        onSubmit={value => { console.log(value) }}
      />
      <div className={styles.buttons}>
        {/* <EditModal title="新增班级" record={{}} onOk={() => {

        }}>
          <Button type="primary">新增班级</Button>
        </EditModal> */}
        <Button type="primary" onClick={() => router.push('/teacher/class/create')}>新增班级</Button>
      </div>
      <CustomTable
        loading={loading}
        columns={columns}
        dataSource={classList}
        current={page}
        total={total}
        rowKey={(record: ClassListItem) => record.id}
        onPagination={(current: number) => {
          dispatch({
            type: 'class/fetchClassPagination',
            payload: { ...PAGINATION_CONFIGS, page: current },
          })
        }}
      />
    </div>
  )
}

const mapStateToProps = ({
  class,
  loading,
}: {
  class: StateType;
  loading: {
    models: {
      [key: string]: boolean;
    };
  };
}) => ({
  class,
  loading: loading.models.class,
})

export default connect(mapStateToProps)(Class);
