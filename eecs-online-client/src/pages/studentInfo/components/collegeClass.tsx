import React from 'react';
import { Dispatch } from 'redux';
import { Select, Spin } from 'antd';
import { connect } from 'dva';
import styles from './collegeClass.less';

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

interface CollegeClassProps {
  dispatch?: Dispatch<any>;
  college?: ViewItemType[];
  studentClass?: ViewItemType[];
  value?: {
    collegeSelect: SelectItem;
    studentClassSelect: SelectItem;
  };
  loading?: boolean;
  onChange?: (value: { college: SelectItem; studentClass: SelectItem }) => void;
}

const CollegeClass: React.FC<CollegeClassProps> = props => {
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

  const getClassOption = () => {
    const { studentClass } = props;
    if (studentClass) {
      return getOption(studentClass);
    }
    return [];
  };

  const selectCollegeItem = (item: SelectItem) => {
    const { dispatch, onChange } = props;

    if (dispatch) {
      dispatch({
        type: 'studentInfo/fetchCollege',
        payload: item.key,
      });
    }
    if (onChange) {
      onChange({
        college: item,
        studentClass: nullSelectItem,
      });
    }
  };

  const selectClassItem = (item: SelectItem) => {
    const { value, onChange } = props;
    if (value && onChange) {
      onChange({
        college: value.collegeSelect,
        studentClass: item,
      });
    }
  };

  const conversionObject = () => {
    const { value } = props;
    if (!value) {
      return {
        college: nullSelectItem,
        studentClass: nullSelectItem,
      };
    }
    const { collegeSelect, studentClassSelect } = value;
    return {
      college: collegeSelect || nullSelectItem,
      student: studentClassSelect || nullSelectItem,
    };
  };
  const { college, studentClass } = conversionObject();
  const { loading } = props;

  return (
    <Spin spinning={false} className={styles.row}>
      <Select
        className={styles.item}
        value={college}
        labelInValue={true}
        showSearch={true}
        onSelect={selectCollegeItem}
      >
        {getCollegeOption}
      </Select>
      <Select
        className={styles.item}
        value={studentClass}
        labelInValue={true}
        showSearch={true}
        onSelect={selectClassItem}
      >
        {getClassOption}
      </Select>
    </Spin>
  );
};

// const mapStateToProps = () => {
//   ({
//     collegeClass,
//     loading,
//   }: {
//     collegeClass: {
//       college: ViewItemType[];
//       studentClass: ViewItemType[];
//     };
//     loading: any;
//   }) => {
//     const { college, studentClass } = collegeClass;
//     loading.models.collegeClass;
//   };
// };

export default connect(mapStateToProps)(CollegeClass);
