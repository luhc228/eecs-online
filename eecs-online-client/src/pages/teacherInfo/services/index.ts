import { TeacherInfoFieldsModel } from '@/interfaces/teacherInfo';
import request from '@/utils/request';

/**
 * 更新信息
 * @param data
 */
export function updateTeacherInfo(data: TeacherInfoFieldsModel) {
  return request.post('/teacher/edit', {
    data,
  });
}
