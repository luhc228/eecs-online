const BasicLayout = '../layouts/BasicLayout';
const UserLayout = '../layouts/UserLayout';

export default [
  {
    path: '/teacher',
    component: BasicLayout,
    Routes: ['src/components/Authorized'], // 所有的子路径都会被这个拦截
    routes: [
      { path: '/teacher/class', component: './class' },
      { path: '/teacher/course', component: './course' },
      { path: '/teacher/course/edit', component: './courseEdit' },
      { path: '/teacher/course/create', component: './courseEdit' },
      { path: '/teacher', redirect: '/teacher/course' },
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
