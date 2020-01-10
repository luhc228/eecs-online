import request from '@/utils/request';
import { FilterFieldsModel, DetailEditModel } from '@/interfaces/teacherHomeworkDetail';
/**
 * 获取学生题目情况信息
 */
export function fetchHomeworkCondition(params: FilterFieldsModel) {
  // console.log('services', params);
  return request.get('/homework_condition/teacher/detail', {
    params,
  });
}
