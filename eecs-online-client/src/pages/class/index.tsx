import React, { Dispatch, useEffect } from 'react';
import Menu, { MenuItem } from 'rc-menu';
import { StudentListItem, ClassListItem } from '@/interfaces/class';
import styles from './index.less';
import { Button, Popconfirm } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import { FormItemComponentProps } from '@/interfaces/components';
import { FORM_COMPONENT, CUSTOM_FORM_TYPES } from '@/enums';
import { StateType } from '../course/models';

const menu = (
  <Menu>
    <MenuItem>classDelete</MenuItem>
    <MenuItem>studentDelete</MenuItem>
  </Menu>
)

function NestedTable(){
  const studentRowRender = () => {
    const colums = [
      {title: '学生姓名', dataIndex: 'studentName'},
      {title: '学号', dataIndex: 'studentNumber'},
      {
        title: '删除', 
        render: (record:StudentListItem) => (
          <span className={styles.operation}>
            {/*气泡弹框确认删除 */}
            <Popconfirm
              title="确定删除该课程"
              onConfirm={() => {
                console.log(record);
              }}>
              <a href="">删除</a>
            </Popconfirm>
          </span>
        )
      }
    ]
  }

  const columns = [
    { title: '班级名称', dataIndex: 'courseClassName'},
    { title: '课程名称', dataIndex: 'courseName'},
    { title: '学生总数', dataIndex: 'studentTotal'},
    { 
      title: '操作',
      render: (record: ClassListItem) =>(
        <span className = {styles.operation}>
          <span>
            <a onClick={()=> router.push('/teacher/class/studentAdd')}>添加学生</a>
          </span>

          <Popconfirm
            title="确定删除该班级"
            onConfirm={() => {
              console.log(record);
            }}>
            <a href="">删除班级</a>
          </Popconfirm>
        </span>
      ),
    }
  ]
}

// 搜索框变量赋值后返回输入所得更新后数组
const filterFormConfig: FormItemComponentProps[] = [
  {
    label: '班级名称',
    name: 'courseName',
    component: FORM_COMPONENT.Input,
  },
  {
    label: '课程名称',
    name: 'location',
    component: FORM_COMPONENT.Input,
  },
]

// interface接口，应用于props，action或state上，但要求满足以下属性结构
interface ClassProps {
    dispatch: Dispatch<any>;  //通过dispatch一个action的方法来更新store中的state
    fetchClassPaginationLoading: boolean;  //检测是否页面加载成功
    courseClass: StateType;
}

// 应用ClassProps这个接口进行插件CourseClass的定义（无props时用{}或object占位）
const CourseClass: React.FC<ClassProps> = props =>{
  const {courseClass: {data: {page, total, classList}}, fetchClassPaginationLoading, dispatch} = props;

  // 副作用——page和pagesize初始化，第一页每页8条
  useEffect(() =>{
  dispatch({
    type: 'class/fetchClassPagination',
    payload: { ...PAGINATION_CONFIGS }, //调用dispatch时没有传入参数，但调用插件其中初始化在第一页，每页8条
  })
  })
}



export default Class;
