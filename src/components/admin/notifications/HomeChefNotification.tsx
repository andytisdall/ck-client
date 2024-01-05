import { useSendHomeChefNotificationMutation } from '../../../state/apis/volunteerApi/homeChefApi';
import NotificationForm from './NotificationForm';

const HomeChefNotification = () => {
  const [sendHomeChefNotification, { isLoading }] =
    useSendHomeChefNotificationMutation();

  return (
    <div>
      <h2>
        Send a <span className="admin-app-name">Home Chef App</span> Push
        Notification
      </h2>
      <NotificationForm
        onSubmit={sendHomeChefNotification}
        isLoading={isLoading}
      />
    </div>
  );
};

export default HomeChefNotification;
