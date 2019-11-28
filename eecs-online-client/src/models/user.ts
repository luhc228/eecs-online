export interface CurrentUser {
  avatar?: string;
  name?: string;
  gender?: string;
  id?: string;
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

  state: {
    currentUser: {
      id: '201700121000',
      name: 'Hengchang',
    },
  },
}

export default UserModel;
