interface breadcrumbConfigProps {
  [k: string]: string;
}

const teacherBreadcrumbConfig: breadcrumbConfigProps = {
  '/teacher/course': '课程信息',
  '/teacher/course/edit': '编辑课程信息',
  '/teacher/course/create': '新增课程信息',
  '/teacher/class': '班级信息',
  '/teacher/class/edit': '编辑班级信息',
  '/teacher/class/create': '新增班级信息',
  '/teacher/question-lib': '题库管理',
  '/teacher/question-lib/create': '创建题目',
  '/teacher/question-lib/edit': '编辑题目',
  '/teacher/homework': '作业管理',
  '/teacher/homework/create': '创建作业',
  '/teacher/homework/edit': '编辑作业',
  '/teacher/homework-completion': '作业完成情况',
  '/teacher/userInfo': '个人信息',
};

const studentBreadcrumbConfig: breadcrumbConfigProps = {
  '/student/homework': '作业信息',
  '/student/homework/edit': '作业编辑',
  '/student/homework-completion': '作业完成情况',
  '/student/userInfo': '个人信息',
};

const breadcrumbConfig = {
  ...teacherBreadcrumbConfig,
  ...studentBreadcrumbConfig,
};

export default breadcrumbConfig;

/**
 * 不可点击的面包屑
 */
export const excludePaths = ['/teacher', '/student'];
