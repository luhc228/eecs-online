const BasicLayoutPath = '../layouts/BasicLayout';
const UserLayoutPath = '../layouts/UserLayout';

export default [
  {
    path: '/',
    component: BasicLayoutPath,
    routes: [
      { path: '/', component: '../pages/index' }
    ]
  },
]