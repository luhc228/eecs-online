import { DetailEditModel } from '@/interfaces/teacherHomeworkDetailEdit';
import request from '@/utils/request';

/**
 * 修改学生得分情况
 * @param data
 */
export function updateTeacherHomeworkDetail(data: DetailEditModel) {
  console.log('data', data);
  return request.post('/homework_condition/teacher/question/score/edit', {
    data,
  });
}
