import React, { useState } from 'react';
import CustomModal from '@/components/CustomModal';
import CustomTable from '@/components/CustomTable';
import StudentTable from '../StudentTable';

interface StudentTableModalProps {
  record?: any;
}

const StudentTableModal: React.FC<StudentTableModalProps> = ({ children, record }) => {
  const [visible, setVisible] = useState(false);

  const showModalHandler = (e) => {
    if (e) e.stopPropagation();
    setVisible(true);
  }

  const okHandler = () => {
    setVisible(false);
  }

  const hideModelHandler = () => {
    setVisible(false);
  }

  return (
    <span>
      <span onClick={showModalHandler}>
        {children}
      </span>
      <CustomModal
        title="Edit User"
        visible={visible}
        onOk={okHandler}
        onCancel={hideModelHandler}
      >
        <StudentTable />
      </CustomModal>
    </span>
  )
}

export default StudentTableModal;
