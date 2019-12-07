import { USER_TYPE } from '@/enums';


export interface CurrentUser {
  // 用户姓名
  name: string,
  // 性别
  gender: string,
  // 学号 或 工号
  id: string,
  // 班级
  class?: string,
  // 学院
  college?: string,
  // 用户类型
  userType: USER_TYPE.Student | USER_TYPE.Teacher,
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {},
}

export default UserModel;
