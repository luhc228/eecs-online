import request from '@/utils/request';
import { StudentDetailModel, ClassDetailModel } from '@/interfaces/classEdit';

/**
 * 获取学生信息列表
 * @param data
 */
export function fetchStudentDetail(data: StudentDetailModel) {
  return request.get('/student/detail', {
    params: {
      data,
    }
  })
}

/**
 * 获取虚拟班级信息详情
 * @param data
 */
export function fetchClassDetail(classId: number) {
  return request.post('/vir_class/get', {
    data: {
      classId
    }
  })
}

/**
 * 新增虚拟班级信息
 * @param data
 */
export function createClass(data: ClassDetailModel) {
  return request.post('/vir_class/add', {
    data,
  })
}

/**
 * 更新虚拟班级信息
 * @param data
 */
export function updateClass(data: ClassDetailModel) {
  return request.post('/vir_class/edit', {
    data,
  })
}
