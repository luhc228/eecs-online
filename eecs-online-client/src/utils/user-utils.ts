import { CurrentUser } from '@/models/user';

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

  logout() {
    this.removeItem('accesstoken');
    this.removeItem('userInfo');
  },

  getItem: (item: string) => localStorage.getItem(item),

  removeItem: (item: string) => {
    localStorage.removeItem(item);
  },

  clearAll: () => localStorage.clear(),
}
