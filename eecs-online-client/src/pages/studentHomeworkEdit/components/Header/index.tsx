import React from 'react';
import { connect } from 'dva';
import { StateType } from '../../models';
import { UmiComponentProps } from '@/interfaces/components';

export interface HeaderProps extends UmiComponentProps {

}

const Header: React.FC<{}> = () => {
  console.log(111);

  return (
    <div>

    </div>
  )
}

const mapStateToProps = ({
  studentHomeworkEdit,

}: {
  studentHomeworkEdit: StateType,
  loading: any,
}) => ({
  studentHomeworkEdit,
  loading: true
})

export default connect(mapStateToProps)(Header);
