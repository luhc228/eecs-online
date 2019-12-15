import React from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Row, Col, Select } from 'antd';
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
  const { collegeList, studentClassList, currentSelectedCollege, currentSelectedStudentClass } = classEdit;

  const selectConfig: SelectConfigProps[] = [
    {
      title: '学院名称',
      placeholder: '请选择学院',
      dataSource: collegeList,
      value: currentSelectedCollege,
      onChange: (value: string) => {
        dispatch({
          type: 'classEdit/setCurrentSelectedCollege',
          payload: {
            college: value,
          }
        })

        const currentStudentClassList = collegeList.find((item: collegeListItem) => item.value === value)?.studentClassList;
        dispatch({
          type: 'classEdit/setStudentClassList',
          payload: {
            studentClassList: currentStudentClassList
          }
        });
        if (currentStudentClassList && !!currentStudentClassList.length) {
          dispatch({
            type: 'classEdit/setCurrentSelectedStudentClass',
            payload: {
              studentClass: currentStudentClassList[0].value
            }
          });
        }
      }
    },
    {
      title: '班级名称',
      placeholder: '请选择班级',
      dataSource: studentClassList,
      value: currentSelectedStudentClass,
      onChange: (value: string) => {
        dispatch({
          type: 'classEdit/setCurrentSelectedStudentClass',
          payload: {
            studentClass: value,
          }
        })
        dispatch({
          type: 'classEdit/fetchStudentDetail',
          payload: {
            college: currentSelectedCollege,
            studentClass: value,
          }
        })
      },
    }
  ]
  return (
    <Row type="flex" align="middle" style={{ marginBottom: 10, textAlign: 'center' }}>
      {selectConfig && selectConfig.map((item: SelectConfigProps, index: number) => (
        <React.Fragment key={index}>
          <Col span={2}>{item.title}</Col>
          <Col span={10}>
            <Select
              showSearch
              defaultValue=''
              style={{ width: '90%' }}
              value={item.value}
              placeholder={item.placeholder}
              onSelect={item.onChange}
              onSearch={() => {
                console.log(1111);
              }}
            // onSelect={() => {
            //   console.log(2222);
            // }}
            >
              {item.dataSource && item.dataSource.map((ele: SelectComponentDatasourceModel, index: number) => (
                <Option value={ele.value} key={`option-${index}`}>{ele.label}</Option>
              ))}
            </Select>
          </Col>
        </React.Fragment>
      ))}
    </Row>
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
