import React from 'react';
import { Avatar, Icon, Menu } from 'antd';
import { connect } from 'dva';
import { ClickParam } from 'antd/es/menu';
import { Dispatch } from 'redux';
import router from 'umi/router';
import HeaderDropdown from '@/components/CustomDropdown';
import styles from './index.less';
import { ConnectState } from '@/models/connect';
import { CurrentUserModels, usernameToFormFieldName } from '@/models/user';
import studentAvatar from '@/assets/student.png';
import teacherAvatar from '@/assets/teacher.png';
import userAvatar from '@/assets/user.png';
import { USER_TYPE } from '@/enums';
import userUtils from '@/utils/user-utils';

const avatar = {
  [USER_TYPE.Student]: studentAvatar,
  [USER_TYPE.Teacher]: teacherAvatar,
};
interface AvatarDropdownProps {
  currentUser?: CurrentUserModels;
  dispatch: Dispatch<any>;
}

const AvatarDropdown: React.SFC<AvatarDropdownProps> = props => {
  const onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = props;
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
    }

    const userInfo = userUtils.getUserInfo();
    const { userType } = userInfo;
    console.log(userType)
    if (key === 'passwordEdit') {
      if (userType === USER_TYPE.Student){
        router.push('/student/passwordEdit');
      }
      if (userType === USER_TYPE.Teacher) {
        router.push('/teacher/passwordEdit');
      }
    }
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <Icon type="logout" />
        <span>退出登录</span>
      </Menu.Item>
      <Menu.Item key='passwordEdit'>
        <Icon type="key" />
        <span>修改密码</span>
      </Menu.Item>
    </Menu>
  );
  const { currentUser } = props;

  const userIdName: any = currentUser
    ? usernameToFormFieldName[USER_TYPE[currentUser.userType]]
    : 'id';

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          className={styles.avatar}
          style={{ verticalAlign: 'middle' }}
          size="default"
          alt="avatar"
          src={currentUser ? avatar[currentUser.userType] : userAvatar}
        >
          {currentUser &&
            currentUser.name &&
            typeof currentUser.name === 'string' &&
            currentUser.name[0]}
        </Avatar>
        <span className={styles.name}>{currentUser && currentUser[userIdName]}</span>
      </span>
    </HeaderDropdown>
  );
};

// const mapStateToProps = ({ user }: ConnectState) =>
//   // TODO:
//   ({
//     currentUser: user.currentUser,
//   });

const mapStateToProps = ({ user }: ConnectState) => {
  // console.log(user);
  return {
    currentUser: user.currentUser,
  };
};

export default connect(mapStateToProps)(AvatarDropdown);
