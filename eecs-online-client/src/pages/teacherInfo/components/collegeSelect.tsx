import React from 'react';
import { Dispatch } from 'redux';
import { Select, Spin } from 'antd';
import { connect } from 'dva';
import styles from './collegeSelect.less';

const { Option } = Select;

export interface ViewItemType {
  name: string;
  id: string;
}

interface SelectItem {
  label: string;
  key: string;
}
const nullSelectItem: SelectItem = {
  label: '',
  key: '',
};

interface CollegeProps {
    dispatch?: Dispatch<any>;
    college?: ViewItemType[];
    value?: {
      college: SelectItem;
    };
    loading?: boolean;
    onChange?: (value: { college: SelectItem }) => void;
}

const CollegeSelect: React.FC<CollegeProps> = props => {
    const getOption = (list: ViewItemType[]) => {
      if (!list || list.length < 1) {
        return (
          <Option key={0} value={0}>
            没有找到选项
          </Option>
        );
      }
      return list.map(item => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ));
    };

    const getCollegeOption = () => {
        const { college } = props;
        if (college) {
          return getOption(college);
        }
        return [];
    };
    
    const selectCollegeItem = (item: SelectItem) => {
        const { dispatch, onChange } = props;
    
        if (dispatch) {
          dispatch({
            type: 'userInfo/fetchCollege',
            payload: item.key,
          });
        }
        if (onChange) {
          onChange({
            college: item,
          });
        }
    };

    const conversionObject = () => {
        const { value } = props;
        if (!value) {
          return {
            college: nullSelectItem,
          };
        }
        const { college} = value;
        return {
          college: college || nullSelectItem,
        };
    };
    const { college } = conversionObject();
    const { loading } = props;
    return (
        <Spin spinning={loading} className={styles.row}>
          <Select
            className={styles.item}
            value={college}
            labelInValue={true}
            showSearch={true}
            onSelect={selectCollegeItem}
          >
            {getCollegeOption}
          </Select>
        </Spin>
      );
};

const mapStateToProps = () => {
  ({
    college,
    loading,
  }: {
    college: ViewItemType[];
    loading: any;
  }) => {
    college;
    loading.models.collegeClass;
  };
  // const { college, studentClass } = state.collegeClass;
  // return {
  //   college,
  //   studentClass,
  //   loading: state.loading.models.collegeClass,
  // };
};

export default connect(mapStateToProps)(CollegeSelect);
