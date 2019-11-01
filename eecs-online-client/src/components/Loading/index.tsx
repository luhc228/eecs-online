import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

interface LoadingProps {
  tip?: string;
}

const Loading: React.SFC<LoadingProps> = ({ tip }) => {
  return (
    <div className={styles.loadingWrap}>
      <Spin tip={tip} />
    </div>
  )
}

Loading.defaultProps = {
  tip: '页面加载中，请稍候...',
};

export default Loading;
