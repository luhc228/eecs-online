import * as React from 'react';
import router from 'umi/router';
import user from '@/utils/user-utils';

/**
 * 判断有没有权限，如果没有，则跳转至登录页面
 */
export default (props: any) => {
  if (!user.isLogin()) {
    const { pathname } = props.location;
    router.push(`/login?redirect=${pathname}`);
  }
  return <>{props.children}</>;
};
