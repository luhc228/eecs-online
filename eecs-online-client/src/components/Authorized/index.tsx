import * as React from 'react';
import user from '@/utils/user';
import router from 'umi/router';

/**
 * 判断有没有权限，如果没有，则跳转至登录页面
 */
export default (props: any) => {
  if (!user.isLogin()) {
    const { pathname } = props.location;
    router.push(`/user/login?redirectUrl=${pathname}`);
  }
  return <>{props.children}</>;
};
