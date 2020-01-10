import request from '@/utils/request';
import { TeacherPasswordForm, StudentPasswordForm } from '@/interfaces/passwordEdit';

/**
 * 密码修改
 * @param data
 */
export function teacherPasswordEdit(data: TeacherPasswordForm) {
  console.log('services', data);
  return request.post('/teacher/password', {
    data,
  });
}

export function studentPasswordEdit(data: StudentPasswordForm) {
  return request.post('/student/password', {
    data,
  });
}
