import { notification } from 'antd';
import { NOTIFICATION_TYPE } from '@/enums';


const showNotification = (message: any, description: string, type: NOTIFICATION_TYPE = NOTIFICATION_TYPE.error) => {
  let content = 'Please try again';

  if (message) {
    content = (message instanceof Error || typeof message === 'object') && message.message ? message.message : message;
  }

  const config = {
    // 通知提醒标题
    message: content,
    // 通知提醒内容
    description,
  };

  switch (type) {
    case NOTIFICATION_TYPE.error:
      notification.error(config);
      break;
    case NOTIFICATION_TYPE.success:
      notification.success(config);
      break;
    case NOTIFICATION_TYPE.warning:
      notification.warning(config);
      break;
    default:
      notification.info(config);
  }

  notification.error(config);
}

export default showNotification;
