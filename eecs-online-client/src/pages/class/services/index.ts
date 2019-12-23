import request from '@/utils/request';

/**
 * 获取班级信息分页
 * @param data
 */
export function fetchClassPagination(data: any) {
  return request.post('/vir_class/pagination', {
    data,
  })
}

/**
 * 删除班级
 * @param data
 */
export function removeClass(classId: string) {
  return request.post('/vir_class/delete', {
    data: {
      classId
    }
  })
}
