/**
 * 教师查看学生作业完成情况
 */
import React, { useEffect } from 'react';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import { StateType } from './models';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import CustomCard from '@/components/CustomCard';
import CustomTable from '@/components/CustomTable';
import { CompletionListItem } from '@/interfaces/teacherHomeworkCompletion';
import { PAGINATION_CONFIGS } from '@/constants';
import styles from './index.less';
import FilterForm from '@/components/CustomForm';
import { ColumnProps } from 'antd/es/table';
import { FormItemComponentProps } from '@/interfaces/components';
import umiRouter from 'umi/router';

interface CompletionProps {
  dispatch: Dispatch<any>;
  fetchCompletionPaginationLoading: boolean;
  location: Location;
  teacherHomeworkCompletion: StateType;
}

const TeacherHomeworkCompletion: React.FC<CompletionProps> = props => {
  const {
    teacherHomeworkCompletion: {
      data: {page, total, list },
      filterFields,
      classIdDataSource
    },
    fetchCompletionPaginationLoading,
    location,
    dispatch,
  } = props;

  const filterFormConfig: FormItemComponentProps[] = [
    {
      label: '学号',
      name: 'studentId',
      component: FORM_COMPONENT.Input,
      required: false,
    },
    {
      label: '姓名',
      name: 'studentName',
      component: FORM_COMPONENT.Input,
      required: false,
    },
    {
      label: '班级',
      name: 'className',
      component: FORM_COMPONENT.Select,
      required: false,
      props: {
        selectMode: 'multiple',
      },
      datasource: classIdDataSource,
    },
  ];

  useEffect(() => {
    if (!filterFormConfig) {
      return;
    }
    dispatch({
      type: 'teacherHomeworkCompletion/fetchCompletionPagination',
      payload: {
        data: {
          ...PAGINATION_CONFIGS,
          // classId: Number(filterFields.className),
          courseId: Number(filterFields.courseId),
          homeworkId: Number(filterFields.homeworkId)
        }
      },
    })
  }, [!filterFormConfig]);

  const handleEdit = (record: CompletionListItem) => {
    umiRouter.push({
      pathname: '/teacher/homework/completion/detail',
      query:{
        homeworkId: record.homeworkId,
        studentId: record.studentId,
      },})
  }

  const columns: ColumnProps<CompletionListItem>[] = [
    { title: '姓名', dataIndex: 'studentName' },
    { title: '学号', dataIndex: 'studentId' },
    { title: '作业名称', dataIndex: 'homeworkName' },
    { title: '课程名称', dataIndex: 'courseName' },
    { title: '班级名称', dataIndex: 'className' },
    { title: '完成情况', dataIndex: 'status' },
    { title: '分数', dataIndex: 'homeworkScore' },
    {
      title: '操作',
      render: (_: string, record: CompletionListItem) => (
        <span className={styles.operation}>
          <span>
            <a onClick={() => handleEdit(record)}>查看</a>
          </span>
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
              type: 'teacherHomeworkCompletion/changeFilterFields',
              payload: { filterFields: allFields },
            })
          }}
          formConfig={filterFormConfig}
          onSubmit={value =>
            dispatch({
              type: 'teacherHomeworkCompletion/fetchCompletionPagination',
              payload: {
                data: {
                  ...PAGINATION_CONFIGS,
                  ...value,
                  ...location.query,
                },
              },
            })
          }
        />
      </CustomCard>

      <CustomCard title="学生作业完成情况列表" >
        <CustomTable
          loading={fetchCompletionPaginationLoading}
          columns={columns}
          dataSource={list}
          current={page}
          total={total}
          rowKey={(record: CompletionListItem) => record.studentName}
          onPagination={(current: number) => {
            dispatch({
              type: 'teacherHomeworkCompletion/fetchCompletionPagination',
              payload: {
                data: {
                  ...PAGINATION_CONFIGS,
                  page: current,
                  ...location.query,
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
  teacherHomeworkCompletion,
  loading,
  router,
}: {
  teacherHomeworkCompletion: StateType;
  loading: {
    effects: {
      [key: string]: boolean;
    };
  };
  router: {
    location: Location;
  };
}) => ({
  teacherHomeworkCompletion,
  fetchCompletionPaginationLoading: loading.effects['teacherHomeworkCompletion/fetchCompletionPagination'],
  location: router.location,
})

export default connect(mapStateToProps)(TeacherHomeworkCompletion);
