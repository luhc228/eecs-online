import request from '@/utils/request';
// import { CourseTableData } from '@/interfaces/course';

/**
 * 获取课程信息分页
 * @param data
 */
export function fetchCoursePagination(data: any) {
  return request.post('/course/pagination', {
    data,
  })
}

/**
 * 删除课程
 * @param data
 */
export function removeCourse(data: { id: number }) {
  return request.post('/course/delete', {
    data,
  })
}
