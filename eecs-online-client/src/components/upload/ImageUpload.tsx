import React, { useState } from 'react';
import { Upload, Icon, message, Spin, Button } from 'antd';
import appConfig from '@/appConfig';

export interface ImageUploadProps {
  name?: string;
  multiple?: boolean;
  action?: string;
  onChange?: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = (props) => {
  const [loading, setLoading] = useState(false);

  const handleChange = (info: any) => {
    console.log(info);
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
    // if (props.onChange) {
    //   onchange({

    //   })
    // }
  };

  return (
    <Spin tip="Uoloading..." spinning={loading}>
      <Upload
        onChange={handleChange}
        listType="picture"
        {...props}
      >
        <Button>
          <Icon type="upload" />Click to upload
        </Button>
      </Upload>
    </Spin>
  )
}

ImageUpload.defaultProps = {
  name: 'file',
  multiple: false,
  action: appConfig.uploadUrl,
}

export default ImageUpload;
