const menuConfig = [
  {
    key: 'course',
    name: '课程',
    link: '/teacher/course',
    icon: 'icon-shouye1',
  },
  {
    key: 'subMenu',
    name: '子菜单',
    icon: 'icon-homepage',
    children: [
      {
        key: 'homepage',
        name: '子菜单1',
        link: '/submenu',
        icon: 'icon-homepage',
      }
    ]
  },
]

export default menuConfig;
