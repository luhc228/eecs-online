const BasicLayoutPath = '../layouts/BasicLayout';
const UserLayoutPath = '../layouts/UserLayout';

export default [
  {
    path: '/teacher',
    component: BasicLayoutPath,
    // Routes: ['src/components/Authorized'], // 所有的子路径都会被这个拦截
    routes: [
      { path: '/teacher/course', component: './course' },
      { path: '/teacher', redirect: '/teacher/course' },
    ],
  },
  {
    path: '/login',
    component: UserLayoutPath,
    routes: [
      { path: '/login', component: './login' },
    ],
  },
  {
    path: '/',
    component: BasicLayoutPath,
    // Routes: ['src/components/Authorized'], // 所有的子路径都会被这个拦截
    routes: [
      { path: '/', redirect: '/teacher/course' },
    ],
  },
  {
    component: '404',
  },
]
