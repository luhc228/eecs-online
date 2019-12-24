import request from '@/utils/request';
import { PaginationParamsModel } from '@/interfaces/class';

/**
 * 获取班级信息分页
 * @param data
 */
export function fetchClassPagination(data: PaginationParamsModel) {
  return request.post('/vir_class/pagination', {
    data,
  })
}

/**
 * 删除班级
 * @param data
 */
export function removeClass(classId: number) {
  return request.post('/vir_class/delete', {
    data: {
      classId
    }
  })
}
