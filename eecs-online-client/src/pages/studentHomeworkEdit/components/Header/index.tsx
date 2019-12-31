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
  const { data, homeworkFields, questionFormIdMap } = studentHomeworkEdit;
  const { homeworkScore, homeworkName } = data;
  const handleSave = () => {
    dispatch({
      type: 'studentHomeworkEdit/saveHomeworkAnswer',
      payload: {
        data: homeworkFields,
        questionFormIdMap
      }
    })
  }

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <div>作业名称：{homeworkName}</div>
        <div>作业总分：{homeworkScore}分</div>
      </div>
      <Button
        type="primary"
        onClick={handleSave}
      >
        暂存作业
      </Button>
    </div>
  )
}

const mapStateToProps = ({
  studentHomeworkEdit,
}: {
  studentHomeworkEdit: StateType,
}) => ({
  studentHomeworkEdit
})

export default connect(mapStateToProps)(Header);
