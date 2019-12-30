import request from '@/utils/request';

export interface StudentDetailData {
  // 学生姓名
  studentName: string;
  // 学生学号
  studentId: string;
  // 学院
  college: string;
  // 班级
  studentClass: string;
  // 性别
  gender: string;
}

/**
 * 新增虚拟班级信息
 * @param data
 */
// TODO: add data interface
export function createClass(data: any) {
  return request.post('/vir_class/add', {
    data,
  })
}

/**
 * 更新虚拟班级信息
 * @param data
 */
// TODO: add data interface
export function updateClass(data: any) {
  return request.post('/vir_class/edit', {
    data,
  })
}

/**
 * 获取学生信息列表
 * @param data
 */
export function fetchStudentDetail(data: StudentDetailData) {
  return request.post('/student/detail', {
    data,
  })
}
