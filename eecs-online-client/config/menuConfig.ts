import { MenuListItemModel } from '@/interfaces/components';

const menuConfig: MenuListItemModel[] = [
  {
    key: 'teacher-class',
    name: '班级管理',
    link: '/teacher/class',
    icon: 'icon-shouye1',
  },
  {
    key: 'teacher-course',
    name: '课程管理',
    link: '/teacher/course',
    icon: 'icon-shouye1',
  },
  {
    key: 'teacher-question-lib',
    name: '题库管理',
    link: '/teacher/question-lib',
    icon: 'icon-shouye1',
  },
  {
    key: 'teacher-homework',
    name: '作业管理',
    link: '/teacher/homework',
    icon: 'icon-shouye1',
  },
  // {
  //   key: 'subMenu',
  //   name: '子菜单',
  //   icon: 'icon-changjingguanli',
  //   children: [
  //     {
  //       key: 'homepage',
  //       name: '子菜单1',
  //       link: '/submenu',
  //       icon: 'icon-changjingguanli',
  //     },
  //   ],
  // },
]

export default menuConfig;
