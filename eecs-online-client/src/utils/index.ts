import { parse } from 'qs';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function setAuthority(authority: string | string[]) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}

/**
 * 获取选项 A - Z
 * @return option A - Z
 */
export function getOption(index: number) {
  const option = String.fromCharCode(index + 65);
  return option;
}

/**
 * @功能描述: 删除对象中的空字符串 或 undefined
 * @参数: obj
 * @返回值: obj
 */
export function removeEmpty(obj: any) {
  Object.entries(obj).forEach(([key, value]) => {
    if (value === '' || value === undefined) {
      delete obj[key];
    }
  });
  return obj;
}
