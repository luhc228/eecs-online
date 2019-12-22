
import * as React from 'react';
import { Icon } from 'antd';

export interface StatusColumnProps {
  text: string;
  status: boolean;
}
const ActiveSvg = () => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="2014"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="12"
    height="12"
  >
    <defs>
      <style type="text/css" />
    </defs>
    <path
      d="M515.2 51.2C256 51.2 44.8 264 44.8 523.2S256 993.6 515.2 993.6s470.4-211.2 470.4-470.4S774.4 51.2 515.2 51.2zM515.2 945.6c-233.6 0-422.4-190.4-422.4-422.4S281.6 99.2 515.2 99.2s422.4 190.4 422.4 422.4S748.8 945.6 515.2 945.6z"
      p-id="2015"
      fill="#1afa29"
    />
    <path
      d="M515.2 523.2m-374.4 0a23.4 23.4 0 1 0 748.8 0 23.4 23.4 0 1 0-748.8 0Z"
      p-id="2016"
      fill="#1afa29"
    />
  </svg>
);
const InActiveSvg = () => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="2014"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="12"
    height="12"
  >
    <defs>
      <style type="text/css" />
    </defs>
    <path
      d="M515.2 51.2C256 51.2 44.8 264 44.8 523.2S256 993.6 515.2 993.6s470.4-211.2 470.4-470.4S774.4 51.2 515.2 51.2zM515.2 945.6c-233.6 0-422.4-190.4-422.4-422.4S281.6 99.2 515.2 99.2s422.4 190.4 422.4 422.4S748.8 945.6 515.2 945.6z"
      p-id="2015"
      fill="#8a8a8a"
    />
    <path
      d="M515.2 523.2m-374.4 0a23.4 23.4 0 1 0 748.8 0 23.4 23.4 0 1 0-748.8 0Z"
      p-id="2016"
      fill="#8a8a8a"
    />
  </svg>
);
const ActiveIcon = (props: any) => <Icon component={ActiveSvg} {...props} />;
const InActiveIcon = (props: any) => <Icon component={InActiveSvg} {...props} />;
const StatusColumn: React.SFC<StatusColumnProps> = ({ text, status }: StatusColumnProps) => (
  <div>
    {status ? (
      <ActiveIcon style={{ color: '#1afa29' }} />
    ) : (
        <InActiveIcon style={{ color: '#8a8a8a' }} />
      )}
    <span style={{ paddingLeft: 5 }}>{text}</span>
  </div>
);

export default StatusColumn;
