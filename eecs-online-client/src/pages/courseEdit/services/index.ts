import request from '@/utils/request';
import { CourseListItem } from '@/interfaces/course';
/**
 * 新增课程信息
 * @param data
 */
export function createCourse(data: any) {
  return request.post('/course/add', {
    data,
  })
}

/**
 * 更新课程信息
 * @param data
 */
export function updateCourse(data: CourseListItem) {
  return request.post('/course/update', {
    data,
  })
}
