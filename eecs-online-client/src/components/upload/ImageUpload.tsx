import React, { useState } from 'react';
import { Upload, Icon, message, Spin, Button } from 'antd';

export interface DraggerUploadProps {
  name: string;
  multiple: boolean;
  action: string;
  onChange: Function;
}

const ImageUpload: React.FC<{}> = (props) => {
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
      <Upload onChange={onChange} listType="picture" {...props}>
        <Button>
          <Icon type="upload" />Click to upload
        </Button>
      </Upload>
    </Spin>
  )
}

export default ImageUpload;
