import * as React from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import user from '@/utils/user-utils';

interface AuthorizedProps {
  dispatch: Dispatch<any>;
}

/**
 * 判断有没有权限，如果没有，则跳转至登录页面
 */
const Anthorized: React.SFC<AuthorizedProps> = props => {
  const { dispatch, children } = props;
  if (!user.isLogin() && dispatch) {
    dispatch({
      type: 'login/logout',
    });

    return null;
  }

  return <>{children}</>;
}

export default connect()(Anthorized);
