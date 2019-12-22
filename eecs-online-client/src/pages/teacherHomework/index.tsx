/**
 * 教师作业管理首页
 */

import { FormItemComponentProps } from '@/interfaces/components';
import { Dispatch } from 'redux';
import { PAGINATION_CONFIGS } from '@/constants';
import { HomeworkListItem } from '@/interfaces/teacherHomework';
import router from 'umi/router';
import { StateType } from './models';
import styles from './index.less';
import React, { useEffect } from 'react';
import { Button, Popconfirm } from 'antd';
import { ColumnProps } from 'antd/es/table';
import FilterForm from '@/components/CustomForm';
import CustomTable from '@/components/CustomTable';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import { connect } from 'dva';

const filterFormConfig: FormItemComponentProps[] = [
    {
        label: '作业名称',
        name: 'homeworkName',
        component: FORM_COMPONENT.Input,
    },
    {
        label: '课程名称',
        name: 'courseName',
        component: FORM_COMPONENT.Input,
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
          type: 'teacherHomework/fetchHomeworkPagination',
          payload: { ...PAGINATION_CONFIGS },
        })
      }, []);

    const handleEdit = (allFields: HomeworkListItem) => {
        dispatch({
          type: 'teacherHomework/changeHomeworkFields',
          payload: { data: allFields },
        })
        router.push('/teacher/homework/edit');
    };

    const handleCreate = () => {
        router.push('/teacher/homework/create');
    };

    const handleDelete = (id: string) => {
        dispatch({
          type: 'teacherHomework/removeHomework',
          payload: { id },
        })
    };

    const columns: ColumnProps<HomeworkListItem>[] = [
        { title: '作业名称', dataIndex: 'homeworkName' },
        { title: '截止日期', dataIndex: 'deadline'},
        { title: '作业描述', dataIndex: 'description' },
        {
            title: '操作',
            render: (_:string, record: HomeworkListItem) => (
                <span className={styles.operation}>
                    <span>
                        <a onClick={() => handleEdit(record)}>编辑作业</a>
                    </span>
                    <Popconfirm
                        title="确定删除此作业"
                        onConfirm={() => {
                        handleDelete(record.id)
                    }}>
                        <a href="">删除</a>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        <>
            <FilterForm
                values={filterFields}
                loading={false}
                formTypes={CUSTOM_FORM_TYPES.Filter}
                onFieldsChange={(allFields: object) => {
                    dispatch({
                        type: 'teacherHomework/changeFilterFields',
                        payload: { filterFields: allFields },
                    })
                }}
                formConfig={filterFormConfig}
                onSubmit={value => dispatch({
                type: 'teacherHomework/fetchHomeworkPagination',
                payload: { ...PAGINATION_CONFIGS, ...value },
                })}
            />
            <div className={styles.buttons}>
                <Button type="primary" onClick={handleCreate}>新增作业</Button>
            </div>
            <CustomTable
                loading={fetchHomeworkPaginationLoading}
                columns={columns}
                dataSource={list}
                current={page}
                total={total}
                rowKey={(record: HomeworkListItem) => record.id}
                onPagination={(current: number) => {
                    dispatch({
                        type: 'teacherHomework/fetchHomeworkPagination',
                        payload: { ...PAGINATION_CONFIGS, page: current },
                    })
                }}
            />
        </>
    );
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
    fetchHomeworkPaginationLoading: loading.effects['teacherHomework/fetchHomeworkPagination'],
  })
  
export default connect(mapStateToProps)(Homework);