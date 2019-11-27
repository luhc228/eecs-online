import React, { useState } from 'react';

interface EditModalProps {
  record: any;
  onOk: () => void;
}

const EditModal: React.SFC<EditModalProps> = ({ record, onOk, children }) => {
  const [visible, setVisible] = useState(false);

  const showModalHandler = (e: React.BaseSyntheticEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setVisible(true);
  }
  return (
    <span>
      <span onClick={showModalHandler}>
        {children}
      </span>
    </span>
  )
}

export default EditModal;
