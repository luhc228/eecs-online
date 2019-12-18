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
      { path: '/teacher/homework-completion', component: './teacherHomeworkCompletion' },
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
      { path: '/student/homework-completion', component: './studentHomeworkCompletion' },
      { path: '/teacher', redirect: '/teacher/class' },
    ],
  },
  {
    path: '/login',
    component: UserLayout,
    routes: [
      { path: '/login', component: './login' },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    Routes: ['src/components/Authorized'], // 所有的子路径都会被这个拦截
    routes: [
      { path: '/', redirect: '/teacher/course' },
    ],
  },
  {
    component: '404',
  },
]
