/**
 * 定义共用api接口
*/

import request from '@/utils/request';

/**
 * 获取学院信息列表
 */
export function fetchCollegeList() {
  return request.get('/college/detail')
}

/**
 * 获取虚拟班级信息列表
 */
export function fetchVirClassList(teacherId: string) {
  return request.post('/vir_class/list', {
    data: {
      teacherId
    }
  })
}
