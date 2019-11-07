import request from '@/utils/request';
import { StudentLoginForm, TeacherLoginForm } from '@/interfaces/login';

export function studentLogin(data: StudentLoginForm) {
  return request.post('/login/student', {
    data,
  });
}

export function teacherLogin(data: TeacherLoginForm) {
  return request.post('/login/teacher', {
    data,
  });
}
