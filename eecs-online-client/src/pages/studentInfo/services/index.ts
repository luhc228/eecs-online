import request from '@/utils/request';
import { StudentInfoFieldsModel } from '@/interfaces/studentInfo';

/**
 * 更新学生信息
 * @param data
 */
export function updateStudentInfo(data: StudentInfoFieldsModel) {
  console.log('services', data);
  return request.post('/student/edit', {
    data,
  });
}

/**
 * 获取个人信息
 * @param data
 */
export function fetchStudentInfo(params: StudentInfoFieldsModel) {
  return request.get('/student/get', {
    params,
  });
}
