import request from '@/utils/request';
import { TeacherLoginForm, StudentLoginForm } from '@/interfaces/login';
/**
 * 新增用户信息
 * @param data
 */
export function teacherRegister(data: TeacherLoginForm) {
  return request.post('/api/teacher', {
    data,
  })
}

export function studentRegister(data: StudentLoginForm) {
  return request.post('/api/student', {
    data,
  })
}