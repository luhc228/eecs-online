import * as React from 'react';
import { connect } from 'dva';
import umiRouter from 'umi/router';
import { Dispatch } from 'redux';
import user from '@/utils/user-utils';

interface AuthorizedProps extends RoutingType {
  dispatch: Dispatch<any>;
}

/**
 * 判断有没有权限，如果没有，则跳转至登录页面
 */
const Anthorized: React.SFC<AuthorizedProps> = ({ dispatch, children, location }) => {
  if (!user.isLogin() && dispatch) {
    dispatch({
      type: 'login/logout',
    });

    return null;
  }

  const userTypeName = user.getCurrentUserTypeName();
  if (userTypeName) {
    const urlPrefix = userTypeName.toLocaleLowerCase();
    if (location.pathname === '/') {
      umiRouter.push(`/${urlPrefix}`);

      return null;
    }

    if (urlPrefix !== location.pathname.split('/')[1]) {
      umiRouter.push(`/${urlPrefix}`);

      return null;
    }
  }

  return <>{children}</>;
}

interface RoutingType {
  location: Location;
}

export default connect(({ router }: { router: RoutingType }) => ({
  location: router.location,
}))(Anthorized);
