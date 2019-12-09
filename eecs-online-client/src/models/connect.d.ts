import { GlobalModelState } from './global';
import { UserModelState } from './user';

export interface ConnectState {
  global: GlobalModelState;
  user: UserModelState;
  // login: UserModelState;
}
