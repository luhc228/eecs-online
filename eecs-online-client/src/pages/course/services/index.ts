import request from '@/utils/request';

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
export function removeCourse(data: any) {
  console.log(data);
  return request.post('/course/delete', {
    data,
  })
}
