import request from '@/utils/request';
import { PaginationParamsModel } from '@/interfaces/teacherHomework';

/**
 * 获取作业信息分页
 * @param data
 */
export function fetchHomeworkPagination(data: PaginationParamsModel) {
  // console.log('data', data);
  return request.post('/homework/teacher/pagination', {
    data,
  });
}

/**
 * 删除作业
 * @param data
 */
export function removeHomework(homeworkId: number) {
  return request.post('/homework/teacher/delete', {
    data: {
      homeworkId,
    },
  });
}
