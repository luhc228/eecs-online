import router from 'umi/router';
import cookie from './cookie';

/**
 * 保存和操作用户登录信息
 * @class User
 */
class User {
  /**
   * 保存token 到cookie中
   * @param accessToken
   */
  saveToken(accessToken: string) {
    cookie.setItem('accessToken', accessToken, { path: '/', maxAge: 3600 * 12 });
  }

  /**
   * 保存登录接口返回的姓名和手机号
   * @param name
   * @param phone
   */
  saveUserInfo(username: string, nickName: string, avatar: string) {
    cookie.setItem('userInfo', JSON.stringify({ username, nickName, avatar }), {
      path: '/',
      maxAge: 3600 * 12,
    });
  }

  /**
   * 从cookie中获取姓名
   */
  getUserInfo() {
    const userInfo = cookie.getItem('userInfo');
    return userInfo
      ? JSON.parse(userInfo)
      : {
        username: '',
        nickName: '',
        avatar: '',
      };
  }

  /**
   * 判断用户是否登录
   */
  isLogin() {
    return !!cookie.getItem('accessToken');
  }

  /**
   * 获取token
   */
  getToken() {
    return cookie.getItem('accessToken');
  }

  /**
   * 用户退出登录
   */
  logout() {
    cookie.removeItem('accessToken');
    cookie.removeItem('userInfo');
    router.replace('/user/login');
  }
}
export default new User();
