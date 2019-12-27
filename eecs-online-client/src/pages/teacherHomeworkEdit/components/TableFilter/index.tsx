import React from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Row, Col, Select, Cascader } from 'antd';
import { StateType } from '../../models';
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
  teacherHomeworkEdit: StateType;
  dispatch: Dispatch<any>;
}

const TableFilter: React.SFC<TableFilterProps> = ({ teacherHomeworkEdit, dispatch }) => {
  const { courseList, tableFilterValue } = teacherHomeworkEdit;

  return (
    <div style={{ margin: '10px 0' }}>
      <Cascader
        options={courseList}
        value={tableFilterValue}
        onChange={(value: string[]) => {
          dispatch({
            type: 'teacherHomeworkEdit/setTableFilterValue',
            payload: {
              tableFilterValue: value,
            },
          });
          dispatch({
            type: 'teacherHomeworkEdit/fetchQuestionDetail',
            payload: {
              course: value[0],
              questionType: value[1],
            },
          });
        }}
        changeOnSelect={true}
      />
    </div>
  );
};

const mapStateToProps = ({ teacherHomeworkEdit }: { teacherHomeworkEdit: StateType }) => ({
  teacherHomeworkEdit,
});

export default connect(mapStateToProps)(TableFilter);
