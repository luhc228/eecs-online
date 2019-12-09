import React from 'react';
import Prompt from 'umi/prompt';

export default () => (
  <>
    <span>提示</span>
    <Prompt
      when
      message={() => window.confirm('当前页面数据尚未保存，是否确定离开？')}
    />
  </>
);
