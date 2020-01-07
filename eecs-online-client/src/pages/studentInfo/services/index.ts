import request from '@/utils/request';
import { StudentInfoFieldsModel } from '@/interfaces/studentInfo';

/**
 * 更新课程信息
 * @param data
 */
export function updateStudentInfo(data: StudentInfoFieldsModel) {
  return request.post('/student/edit', {
    data,
  });
}
