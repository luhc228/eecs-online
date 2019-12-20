import React, { useState } from 'react';
import { Upload, Icon, message, Spin } from 'antd';

const { Dragger } = Upload;

export interface DraggerUploadProps {
  name: string;
  multiple: boolean;
  action: string;
  onChange: Function;
}

const DraggerUpload: React.FC<{}> = (props) => {
  const [loading, setLoading] = useState(false);
  const onChange = (info: any) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      setLoading(true);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      setLoading(false);
    } else if (status === 'error') {
      setLoading(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Spin tip="Uoloading..." spinning={loading}>
      <Dragger {...props} onChange={onChange}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload.
          Strictly prohibit from uploading company data or other band files
        </p>
      </Dragger>
    </Spin>
  )
}

export default DraggerUpload;
