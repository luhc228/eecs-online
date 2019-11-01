const menuConfig = [
  {
    key: 'homepage',
    name: '首页',
    link: '/homepage',
    icon: 'icon-shouye1',
  },
  {
    key: 'thermometer',
    name: '温度检测',
    link: '/thermometer',
    icon: 'icon-wendu',
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
