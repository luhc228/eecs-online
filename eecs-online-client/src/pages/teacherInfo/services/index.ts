import { TeacherInfoFieldsModel } from '@/interfaces/teacherInfo';
import request from '@/utils/request';

/**
 * 更新信息
 * @param data
 */
export function updateTeacherInfo(data: TeacherInfoFieldsModel) {
  console.log('services', data);
  return request.post('/teacher/edit', {
    data,
  });
}

/**
 * 获取信息
 * @param data
 */
export function fetchTeacherInfo(params: TeacherInfoFieldsModel) {
  return request.get('/teacher/get', {
    params,
  });
}
