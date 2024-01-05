import NotificationForm from './NotificationForm';
import { useSendD4JNotificationMutation } from '../../../state/apis/d4jApi';

const HomeChefNotification = () => {
  const [sendD4JNotification, { isLoading }] = useSendD4JNotificationMutation();

  return (
    <div>
      <h2>
        Send a <span className="admin-app-name">Dining for Justice App</span>{' '}
        Push Notification
      </h2>
      <NotificationForm onSubmit={sendD4JNotification} isLoading={isLoading} />
    </div>
  );
};

export default HomeChefNotification;
