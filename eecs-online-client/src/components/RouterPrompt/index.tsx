import React from 'react';
import Prompt from 'umi/prompt';

interface RouterPromptProps {
  when?: boolean
}

const RouterPrompt: React.SFC<RouterPromptProps> = ({ when }) => (
  <Prompt
    when={when}
    // message={location => window.confirm(`confirm to leave to ${location.pathname}?`)}
    message={() => window.confirm('当前页面数据尚未保存，是否确定离开？')}
  />
)

RouterPrompt.defaultProps = {
  when: true,
}

export default RouterPrompt;
