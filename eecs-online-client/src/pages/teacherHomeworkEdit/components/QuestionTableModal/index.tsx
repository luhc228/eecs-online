import React, { useState } from 'react';
import CustomModal from '@/components/CustomModal';
import QuestionTable from '../QuestionTable';

interface QuestionTableModalProps {
  record?: any;
}

const QuestionTableModal: React.FC<QuestionTableModalProps> = ({ children, record }) => {
  const [visible, setVisible] = useState(false);

  const showModalHandler = e => {
    if (e) e.stopPropagation();
    setVisible(true);
  };

  const okHandler = () => {
    setVisible(false);
  };

  const hideModelHandler = () => {
    setVisible(false);
  };

  return (
    <span>
      <span onClick={showModalHandler}>{children}</span>
      <CustomModal title="Edit User" visible={visible} onOk={okHandler} onCancel={hideModelHandler}>
        <QuestionTable />
      </CustomModal>
    </span>
  );
};

export default QuestionTableModal;
