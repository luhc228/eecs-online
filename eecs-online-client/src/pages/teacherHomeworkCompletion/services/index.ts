import request from '@/utils/request';
import { PaginationParamsModel } from '@/interfaces/teacherHomeworkCompletion';

/**
 * 获取作业完成信息分页
 * @param data
 */
export function fetchCompletionPagination(data: PaginationParamsModel) {
  console.log(data);
  return request.post('/homework_condition/teacher/pagination', {
    data,
  });
}
