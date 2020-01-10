import { Dispatch } from 'redux';
import { connect } from 'dva';
import React from 'react';
import { USER_TYPE } from '@/enums';
import styles from './index.less';
import PasswordEditForm from './components/EditForm';
import CustomCard from '@/components/CustomCard';

interface PasswordProps {
  dispatch: Dispatch<any>;
  userType: USER_TYPE;
}

const Password: React.FC<PasswordProps> = props => (
  <CustomCard title="用户密码修改">
    <div className={styles.main}>
      <PasswordEditForm />
    </div>
  </CustomCard>
);

const mapStateToProps = (state: any) => {
  // const { userType } = state.register;
  // return {
  //   userType,
  // };
};

export default connect(mapStateToProps)(Password);
