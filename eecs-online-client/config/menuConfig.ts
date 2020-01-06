import { MenuListItemModel } from '@/interfaces/components';
import { USER_TYPE } from '@/enums';

// 不包含子菜单的情况
// {
//   key: 'teacher-class',
//   name: '班级管理',
//   link: '/teacher/class',
//   icon: 'icon-shouye1',
//   userType: USER_TYPE.Teacher,
// },

// 包含子菜单的情况
// {
//   key: 'subMenu',
//   name: '子菜单',
//   icon: 'icon-changjingguanli',
//   userType: USER_TYPE.Teacher,
//   children: [
//     {
//       key: 'homepage',
//       name: '子菜单1',
//       link: '/submenu',
//       icon: 'icon-changjingguanli',
//     },
//   ],
// },

const menuConfig: MenuListItemModel[] = [
  {
    key: 'teacher-class',
    name: '班级管理',
    link: '/teacher/class',
    icon: 'icon-shouye1',
    userType: USER_TYPE.Teacher,
  },
  {
    key: 'teacher-course',
    name: '课程管理',
    link: '/teacher/course',
    icon: 'icon-shouye1',
    userType: USER_TYPE.Teacher,
  },
  {
    key: 'teacher-question-lib',
    name: '题库管理',
    link: '/teacher/question-lib',
    icon: 'icon-shouye1',
    userType: USER_TYPE.Teacher,
  },
  {
    key: 'teacher-homework',
    name: '作业管理',
    link: '/teacher/homework',
    icon: 'icon-shouye1',
    userType: USER_TYPE.Teacher,
  },
  {
    key: 'teacher-homework-completion',
    name: '作业完成情况',
    link: '/teacher/homework/completion',
    icon: 'icon-shouye1',
    userType: USER_TYPE.Teacher,
  },
  {
    key: 'student-homework',
    name: '作业信息',
    link: '/student/homework',
    icon: 'icon-shouye1',
    userType: USER_TYPE.Student,
  },
  {
    key: 'student-userInfo',
    name: '个人信息',
    link: '/student/userInfo',
    icon: 'icon-shouye1',
    userType: USER_TYPE.Student,
  },
  {
    key: 'teacher-userInfo',
    name: '个人信息',
    link: '/teacher/userInfo',
    icon: 'icon-shouye1',
    userType: USER_TYPE.Teacher,
  },
];

export default menuConfig;
