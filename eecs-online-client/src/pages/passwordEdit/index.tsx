import { Dispatch } from 'redux';
import { connect } from 'dva';
import React from 'react';
import { USER_TYPE } from '@/enums';
import styles from './index.less';
import PasswordEditForm from './components/EditForm';

interface PasswordProps {
  dispatch: Dispatch<any>;
  userType: USER_TYPE;
}

const Password: React.FC<PasswordProps> = props => (
  <div className={styles.main}>
    <PasswordEditForm />
  </div>
);

const mapStateToProps = (state: any) => {
  // const { userType } = state.register;
  // return {
  //   userType,
  // };
};

export default connect(mapStateToProps)(Password);
