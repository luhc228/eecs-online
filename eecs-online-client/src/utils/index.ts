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
  // const optionsDataSource: string[] = [];
  // for (let i = 65; i < 91;) {
  //   optionsDataSource.push(String.fromCharCode(i));
  //   i += 1;
  // }
  const option = String.fromCharCode(index + 65);
  return option;
}
