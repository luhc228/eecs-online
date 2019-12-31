import request from '@/utils/request';

export async function queryCurrent() {
  return request.post('/student/edit', { data });
}

export async function queryCollege() {
  return request.get('/college/detail', { data });
}

export async function queryStudentClass(studentClass: string) {
  return request.get('/student/class/list');
  // return request(`/student/college/${studentClass}`);
}

// export async function queryUsers() {
//   return request('/student/users');
// }
