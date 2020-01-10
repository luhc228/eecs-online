export interface StateType {
  userType: USER_TYPE;
  userForm: {
    id?: string;
    password?: string;
  };
  when?: boolean;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  reducers: {
    changeUserType: Reducer<StateType>;
  };
  effects: {
    userRegister: Effect<StateType>;
  };
}
