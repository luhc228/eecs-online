import request from '@/utils/request';

/**
 * 获取班级信息分页
 * @param data
 */
export function fetchClassPagination(data: any) {
  return request.post('/class/pagination', {
    data,
  })
}

/**
 * 删除班级
 * @param data
 */
export function removeClass(data: any) {
  return request.post('/class/delete', {
    data,
  })
}
