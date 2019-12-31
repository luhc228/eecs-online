import request from 'umi-request';

export async function queryCurrent() {
  return request('/student/currentUser');
}

export async function queryCollege() {
  return request('/student/college');
}

export async function queryStudentClass(studentClass: string) {
  return request(`/student/college/${studentClass}`);
}

export async function queryUsers() {
  return request('/student/users');
}
