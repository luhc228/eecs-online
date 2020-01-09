import React from 'react';
import { connect } from 'dva';
import { StateType } from '../../models';
import styles from './index.less';

export interface HeaderProps {
  teacherHomeworkDetail: StateType;
}

const Header: React.FC<HeaderProps> = ({ teacherHomeworkDetail }) => {
  const { data } = teacherHomeworkDetail;
  console.log(data);
  const { homeworkName, homeworkScore, finalScore, studentId, studentName } = data;

  return (
    <div className={styles.header}>
      <div>
        <span>作业名称：{homeworkName}</span>
      </div>
      <div>
        <span>学生姓名：{studentName}</span>
        <span style={{ marginLeft: 20 }}>学号：{studentId}</span>
      </div>
      <div>
        <span>作业总分：{homeworkScore}分</span>
        <span style={{ marginLeft: 20 }}>学生得分：{finalScore}分</span>
      </div>
    </div>
  );
};

const mapStateToProps = ({ teacherHomeworkDetail }: { teacherHomeworkDetail: StateType }) => ({
  teacherHomeworkDetail,
});

export default connect(mapStateToProps)(Header);
