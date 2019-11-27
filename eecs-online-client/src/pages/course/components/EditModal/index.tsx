import React, { useState } from 'react';

interface EditModalProps {
  record: any;
  onOk: () => void
}

const EditModal: React.SFC<EditModalProps> = ({ record }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>111</div>
  )
}

export default EditModal;
