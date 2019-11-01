const BasicLayoutPath = '../layouts/BasicLayout';
const UserLayoutPath = '../layouts/UserLayout';

export default [
  {
    path: '/teacher',
    component: BasicLayoutPath,
    routes: [
      { path: '/teacher/course', component: '' }
    ]
  },
  {
    path: '/login',
    component: UserLayoutPath,
    routes: [
      { path: '/login', component: './login' }
    ]
  },
  {
    component: '404',
  },
]