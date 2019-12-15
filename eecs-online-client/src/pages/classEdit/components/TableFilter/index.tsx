import React from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Row, Col, Select, Cascader } from 'antd';
import { StateType, collegeListItem } from '../../models';
import { SelectComponentDatasourceModel } from '@/interfaces/components';

const { Option } = Select;

interface SelectConfigProps {
  title: string;
  placeholder: string;
  dataSource: SelectComponentDatasourceModel[];
  value?: string;
  onChange: (value: string) => void;
}

interface TableFilterProps {
  classEdit: StateType,
  dispatch: Dispatch<any>,
}

const TableFilter: React.SFC<TableFilterProps> = ({ classEdit, dispatch }) => {
  const { collegeList, tableFilterValue } = classEdit;

  return (
    <div style={{ margin: '10px 0' }}>
      <Cascader
        options={collegeList}
        value={tableFilterValue}
        onChange={(value: string[]) => {
          dispatch({
            type: 'classEdit/setTableFilterValue',
            payload: {
              tableFilterValue: value
            }
          })
          dispatch({
            type: 'classEdit/fetchStudentDetail',
            payload: {
              college: value[0],
              studentClass: value[1],
            }
          })
        }}
        changeOnSelect
      />
    </div>
  )
}

const mapStateToProps = ({
  classEdit,
}: {
  classEdit: StateType,
}) => ({
  classEdit,
})

export default connect(mapStateToProps)(TableFilter)
