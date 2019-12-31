import React from 'react';
import { connect } from 'dva';
import { StateType } from '../../models';
import styles from './index.less';

export interface HeaderProps {
  studentHomeworkDetail: StateType,
}

const Header: React.FC<HeaderProps> = ({
  studentHomeworkDetail
}) => {
  const { data } = studentHomeworkDetail;
  const { homeworkScore, homeworkName } = data;

  return (
    <div className={styles.header}>
      <div>
        <span>作业名称：{homeworkName}</span>
      </div>

      <div>
        <span>作业总分：{homeworkScore}分</span>
        <span style={{ marginLeft: 20 }}>你的得分：{homeworkScore}分</span>
      </div>
    </div>
  )
}

const mapStateToProps = ({
  studentHomeworkDetail,
}: {
  studentHomeworkDetail: StateType,
}) => ({
  studentHomeworkDetail
})

export default connect(mapStateToProps)(Header);
