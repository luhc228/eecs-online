import React, { useState } from 'react';
import CustomModal from '@/components/CustomModal';

interface EditModalProps {
  title: string;
  record: any;
  onOk: () => void;
}

const EditModal: React.SFC<EditModalProps> = ({ title, record, onOk, children }) => {
  const [visible, setVisible] = useState(false);

  const showModalHandler = (e: React.BaseSyntheticEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setVisible(true);
  }

  const okHandler = () => {

  }

  const cancelHandler = () => {
    setVisible(false)
  }

  return (
    <span>
      <span onClick={showModalHandler}>
        {children}
      </span>
      <CustomModal title={title} visible={visible} onOk={okHandler} onCancel={cancelHandler}>
        123
      </CustomModal>
    </span>
  )
}

export default EditModal;
