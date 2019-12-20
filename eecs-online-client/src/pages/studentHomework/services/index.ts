import request from '@/utils/request';
import { StudentHomeworkPaginationProps } from '@/interfaces/studentHomework';

/**
 * 获取学生作业列表（分页）
 * @param data
 */
export function fetchStudentHomeworkPagination(data: StudentHomeworkPaginationProps) {
  return request.post('/homework/student/pagination', {
    data,
  })
}
