import request from '@/utils/request';

/**
 * 新增虚拟班级信息
 * @param data
 */
export function createClass(data: any) {
  return request.post('/vir_class/add', {
    data,
  })
}

/**
 * 更新课程信息
 * @param data
 */
export function updateClass(data: any) {
  return request.post('/vir_class/edit', {
    data,
  })
}

export interface StudentDetailData {
  college: string;
  studentClass?: string;
}

/**
 * 获取学生分页
 * @param data
 */
export function fetchStudentDetail(data: StudentDetailData) {
  return request.post('/student/detail', {
    data,
  })
}
