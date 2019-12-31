const BasicLayout = '../layouts/BasicLayout';
const UserLayout = '../layouts/UserLayout';

export default [
  {
    path: '/teacher',
    component: BasicLayout,
    Routes: ['src/components/Authorized'], // 所有的子路径都会被这个拦截
    routes: [
      { path: '/teacher/class', component: './class' },
      { path: '/teacher/class/edit', component: './classEdit' },
      { path: '/teacher/class/create', component: './classEdit' },
      { path: '/teacher/course', component: './course' },
      { path: '/teacher/course/edit', component: './courseEdit' },
      { path: '/teacher/course/create', component: './courseEdit' },
      { path: '/teacher/question-lib', component: './questionLib' },
      { path: '/teacher/question-lib/create', component: './questionLibEdit' },
      { path: '/teacher/question-lib/edit', component: './questionLibEdit' },
      { path: '/teacher/homework', component: './teacherHomework' },
      { path: '/teacher/homework/create', component: './teacherHomeworkEdit' },
      { path: '/teacher/homework/edit', component: './teacherHomeworkEdit' },
      { path: '/teacher/homework/completion', component: './teacherHomeworkCompletion' },
      // { path: '/teacher/homework/completion/edit', component: './teacherHomeworkDetail' },
      { path: '/teacher/userInfo', component: './teacherInfo' },
      { path: '/teacher', redirect: '/teacher/class' },
    ],
  },
  {
    path: '/student',
    component: BasicLayout,
    Routes: ['src/components/Authorized'], // 所有的子路径都会被这个拦截
    routes: [
      { path: '/student/homework', component: './studentHomework' },
      { path: '/student/homework/edit', component: './studentHomeworkEdit' },
      { path: '/student/homework/detail', component: './studentHomeworkDetail' },
      // { path: '/student/homework-completion', component: './studentHomeworkCompletion' },
      { path: '/student/userInfo', component: './studentInfo' },
      { path: '/student', redirect: '/student/homework' },
    ],
  },

  {
    path: '/login',
    component: UserLayout,
    routes: [
      { path: '/login', component: './login' },
      { path: '/login/register', component: './register' },
      // { path: '/login/forgot', component: './forgot' },
    ],
  },

  {
    path: '/',
    component: BasicLayout,
    Routes: ['src/components/Authorized'], // 所有的子路径都会被这个拦截
    exact: true,
  },
  {
    component: '404',
  },
];
