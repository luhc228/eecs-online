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

// 信息列表
const columns: ColumnProps<CourseListItem>[] = [
  // 列表各列标题
  { title: '课程名称', dataIndex: 'courseName' },
  { title: '上课地点', dataIndex: 'location' },
  { title: '上课时间', dataIndex: 'time' },
  { title: '上课班级', dataIndex: 'classNames' },
  {
    title: '操作',
    // 两个函数：编辑和删除
    render: (_: string, record: CourseListItem) => (
      <span className={styles.operation}>
        {/* <EditModal title="编辑课程" record={record} onOk={() => router.push('/teacher/course/edit')}>
          <a>编辑课程</a>
        </EditModal> */}

        {/*超链接按钮点击编辑课程对应一个路由 */}
        <span>
          <a onClick={() => router.push('/teacher/course/edit')}>编辑课程</a>
        </span>

        {/*气泡确认框确定删除前弹框提示*/}
        <Popconfirm
          title="确定删除该课程"
          onConfirm={() => {
            console.log(record);
          }}>
          <a href="">删除</a>
        </Popconfirm>
      </span>
    ),
  },
];

// 搜索框变量赋值后返回输入所得更新后数组
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

// 组件中变量类型定义
interface CourseProps {
  dispatch: Dispatch<any>;
  fetchCoursePaginationLoading: boolean;
  course: StateType;
}

/* 定义course组件{赋值语句（继承props）;
                  }*/
// 属性来自于courseprops和props
const Course: React.FC<CourseProps> = props => {
  const { course: { data: { page, total, courseList } }, fetchCoursePaginationLoading, dispatch } = props;

// 副作用操作定义 —— DOM突变后(dispatch通过action导致了state突变）触发并同步更新渲染
  useEffect(() => {
    dispatch({
      // dispatch传入参数为一个action（数据从应用传到store），效果为更新相应状态
      type: 'course/fetchCoursePagination',  //表示将要执行的动作
      payload: { ...PAGINATION_CONFIGS },  //
    })
  }, []);
  
  // 返回显示定义
  return (
    <div>
      {/*过滤表单定义 */}
      <FilterForm
        values={{}}
        loading={false}
        formTypes={CUSTOM_FORM_TYPES.Filter}  // 分页过滤显示
        onFieldsChange={(allFields: object) => { console.log(allFields) }}  // 过滤后会显示的allFields
        formConfig={filterFormConfig}  // 搜索框
        onSubmit={value => { console.log(value) }}  // 打印value
      />
      
      {/*新增课程按钮 —— 按下之后进入路由为create的网页*/}
      <div className={styles.buttons}>
        {/* <EditModal title="新增课程" record={{}} onOk={() => {

        }}>
          <Button type="primary">新增课程</Button>
        </EditModal> */}
        <Button type="primary" onClick={() => router.push('/teacher/course/create')}>新增课程</Button>
      </div>
      <CustomTable
        loading={fetchCoursePaginationLoading}
        columns={columns}
        dataSource={courseList}
        current={page}
        total={total}
        rowKey={(record: CourseListItem) => record.id}
        // 目前页数current传入store更新page，由分页插件跳转渲染
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

// 定义插件 —— 属性：course loading
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
  // 数据类型为boolean的loading.effect
  fetchCoursePaginationLoading: loading.effects['course/fetchCoursePagination'],
})

export default connect(mapStaetToProps)(Course);
