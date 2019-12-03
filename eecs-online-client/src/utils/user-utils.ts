import { CurrentUser } from '@/models/user';

// import router from 'umi/router';
// import cookie from './cookie';

// /**
//  * 保存和操作用户登录信息
//  * @class User
//  */
// class User {
//   /**
//    * 保存token 到cookie中
//    * @param accessToken
//    */
//   saveToken(accessToken: string) {
//     cookie.setItem('accessToken', accessToken, { path: '/', maxAge: 3600 * 12 });
//   }

//   /**
//    * 保存登录接口返回的姓名和手机号
//    * @param name
//    * @param phone
//    */
//   saveUserInfo(username: string, nickName: string, avatar: string) {
//     cookie.setItem('userInfo', JSON.stringify({ username, nickName, avatar }), {
//       path: '/',
//       maxAge: 3600 * 12,
//     });
//   }

//   /**
//    * 从cookie中获取姓名
//    */
//   getUserInfo() {
//     const userInfo = cookie.getItem('userInfo');
//     return userInfo
//       ? JSON.parse(userInfo)
//       : {
//         username: '',
//         nickName: '',
//         avatar: '',
//       };
//   }

//   /**
//    * 判断用户是否登录
//    */
//   isLogin() {
//     return !!cookie.getItem('accessToken');
//   }

//   /**
//    * 获取token
//    */
//   getToken() {
//     return cookie.getItem('accessToken');
//   }

//   /**
//    * 用户退出登录
//    */
//   logout() {
//     cookie.removeItem('accessToken');
//     cookie.removeItem('userInfo');
//     router.replace('/user/login');
//   }
// }
// export default new User();

export default {
  /**
   * 判断是否登录
   */
  isLogin: () => localStorage.getItem('accesstoken'),

  /**
   * 保存用户accesstoken
   */
  saveToken: (token: string) => {
    localStorage.setItem('accesstoken', token)
  },

  /**
   * 获取accesstoken
   */
  getToken() {
    return this.getItem('accesstoken');
  },

  /**
   * 保存用户信息
   */
  saveUserInfo: (currentUser: CurrentUser) => {
    localStorage.setItem('userInfo', JSON.stringify(currentUser))
  },

  /**
   * 获取用户信息
   */
  getUserInfo: () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return {};
  },

  getItem: (item: string) => localStorage.getItem(item),

  removeItem: (item: string) => {
    localStorage.removeItem(item);
  },

  clearAll: () => localStorage.clear(),
}
