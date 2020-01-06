/**
 * 教师作业管理首页
 */

import { FormItemComponentProps } from '@/interfaces/components';
import { Dispatch } from 'redux';
import { PAGINATION_CONFIGS } from '@/constants';
import { HomeworkListItem } from '@/interfaces/teacherHomework';
import umiRouter from 'umi/router';
import { StateType } from './models';
import styles from './index.less';
import React, { useEffect } from 'react';
import { Button, Popconfirm } from 'antd';
import { ColumnProps } from 'antd/es/table';
import FilterForm from '@/components/CustomForm';
import CustomTable from '@/components/CustomTable';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import { connect } from 'dva';
// import { CompletionListItem } from '@/interfaces/teacherHomeworkCompletion';
import CustomCard from '@/components/CustomCard';
import router from 'umi/router';

const filterFormConfig: FormItemComponentProps[] = [
    {
        label: '作业名称',
        name: 'homeworkName',
        component: FORM_COMPONENT.Input,
        required: false,
    },
    {
        label: '课程名称',
        name: 'courseName',
        component: FORM_COMPONENT.Input,
        required: false,
    },
]

interface HomeworkProps {
    dispatch: Dispatch<any>;
    fetchHomeworkPaginationLoading: boolean;
    homework: StateType;
}

const Homework: React.FC<HomeworkProps> = props => {
    const {
      homework: {
        data: { page, total, list },
        filterFields,
      },
      fetchHomeworkPaginationLoading,
      dispatch,
    } = props;

    useEffect(() => {
        dispatch({
          type: 'homework/fetchHomeworkPagination',
          payload: { data: {...PAGINATION_CONFIGS} },
        })
      }, []);
    // console.log('list',list);
    // console.log(filterFields);

    const handleEdit = (allFields: HomeworkListItem) => {
        dispatch({
          type: 'homework/changeHomeworkFields',
          payload: { data: allFields },
        })
        router.push('/teacher/homework/edit');
    };

    const handleCreate = () => {
        router.push('/teacher/homework/create');
    };

    const handleDelete = (homeworkId: number) => {
        dispatch({
          type: 'homework/removeHomework',
          payload: { homeworkId },
        })
    };

    const handleCompletion = (record: HomeworkListItem) => {
        umiRouter.push({
            pathname: '/teacher/homework/completion',
            query:{homeworkId: record.homeworkId},})
    }

    const columns: ColumnProps<HomeworkListItem>[] = [
        { title: '作业名称', dataIndex: 'homeworkName' },
        // { title: '发布时间', dataIndex: 'startAt'},
        { title: '截止时间', dataIndex: 'endAt'},
        { title: '作业描述', dataIndex: 'description' },
        { title: '总分', dataIndex: 'homeworkScore'},
        {
            title: '操作',
            render: (_:string, record: HomeworkListItem) => (
                <span className={styles.operation}>
                    <span>
                        <a onClick={() => handleEdit(record)}>编辑作业</a>
                    </span>
                    <span>
                        <a onClick={() => handleCompletion(record)}>完成情况</a>
                    </span>
                    <Popconfirm
                        title="确定删除此作业"
                        onConfirm={() => {
                        handleDelete(record.homeworkId)
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
              type: 'homework/changeFilterFields',
              payload: { filterFields: allFields },
            })
          }}
          formConfig={filterFormConfig}
          onSubmit={value => dispatch({
            type: 'homework/fetchHomeworkPagination',
            payload: {
              data:
              {
                ...PAGINATION_CONFIGS,
                ...value,
              }
            },
          })}
        />
      </CustomCard>

      <CustomCard
        title="作业信息列表"
        extra={
          <Button type="primary" onClick={handleCreate}>新增作业</Button>}>
        <CustomTable
          loading={fetchHomeworkPaginationLoading}
          columns={columns}
          dataSource={list}
          current={page}
          total={total}
          rowKey={(record: HomeworkListItem) => record.homeworkId}
          onPagination={(current: number) => {
            dispatch({
              type: 'homework/fetchHomeworkPagination',
              payload: {
                data: {
                  ...PAGINATION_CONFIGS,
                  // ...filterFields,
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
    homework,
    loading,
  }: {
    homework: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    homework,
    fetchHomeworkPaginationLoading: loading.effects['homework/fetchHomeworkPagination'],
  })
  
export default connect(mapStateToProps)(Homework);
