interface breadcrumbConfigProps {
  [k: string]: string
}

const breadcrumbConfig: breadcrumbConfigProps = {
  '/teacher/course': '课程信息',
  '/teacher/course/edit': '编辑课程信息',
  '/teacher/course/create': '新增课程信息',
  '/teacher/class': '班级信息',
  '/teacher/class/edit': '编辑班级信息',
  '/teacher/class/create': '新增班级信息',
}

export default breadcrumbConfig;

/**
 * 不可点击的面包屑
 */
export const excludePaths = ['/teacher']
