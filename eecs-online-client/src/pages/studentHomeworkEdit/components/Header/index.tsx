import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { StateType } from '../../models';
import { UmiComponentProps } from '@/interfaces/components';
import styles from './index.less';

export interface HeaderProps extends UmiComponentProps {
  studentHomeworkEdit: StateType,
}

const Header: React.FC<HeaderProps> = ({
  dispatch,
  studentHomeworkEdit
}) => {
  const { data } = studentHomeworkEdit;
  const { homeworkScore } = data;
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        {homeworkScore}
      </div>
      <Button
        type="primary"
        onClick={() => {

        }}
      >
        暂存答案
      </Button>
    </div>
  )
}

const mapStateToProps = ({
  studentHomeworkEdit,
  loading
}: {
  studentHomeworkEdit: StateType,
  loading: any,
}) => ({
  studentHomeworkEdit,
  loading: loading.model.studentHomeworkEdit
})

export default connect(mapStateToProps)(Header);
