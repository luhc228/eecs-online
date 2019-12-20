import React from 'react';
import { Card } from 'antd';
import { CardTabListType } from 'antd/es/card';

export interface CustomCardProps {
  title?: string | React.ReactNode;
  extra?: string | React.ReactNode;
  bordered?: boolean;
  onTabChange?: (key: string) => void;
  activeTabKey?: string;
  tabList?: CardTabListType[];
  tabBarExtraContent?: string | React.ReactNode;
}
const CustomCard: React.FC<CustomCardProps> = ({
  children,
  title,
  extra,
  bordered,
  onTabChange,
  activeTabKey,
  tabBarExtraContent,
  tabList }) => (
    <Card
      title={title}
      extra={extra}
      bordered={bordered}
      tabBarExtraContent={tabBarExtraContent}
      onTabChange={onTabChange}
      activeTabKey={activeTabKey}
      tabList={tabList}
    >
      {children}
    </Card>
  )

CustomCard.defaultProps = {
  bordered: false
}
export default CustomCard;
