import { format } from 'date-fns';

import {
  useSendHomeChefNotificationMutation,
  useGetHomeChefNotificationsQuery,
} from '../../../state/apis/volunteerApi/homeChefApi';
import NotificationForm from './NotificationForm';
import Loading from '../../reusable/loading/Loading';

const HomeChefNotification = () => {
  const [sendHomeChefNotification, { isLoading }] =
    useSendHomeChefNotificationMutation();

  const { data: pastNotifications, isLoading: pastLoading } =
    useGetHomeChefNotificationsQuery();

  const renderPastNotifications = () => {
    if (pastNotifications) {
      return pastNotifications.map((notification) => {
        return (
          <div key={notification.id} className="admin-delete-user">
            <strong>
              {format(new Date(notification.date), 'M/d/yy h:mm a')}
            </strong>
            <p>
              <strong>Title:</strong> {notification.payload.title}
            </p>
            <p>
              <strong>Message:</strong> {notification.payload.body}
            </p>
          </div>
        );
      });
    }
  };

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
      {pastLoading ? <Loading /> : renderPastNotifications()}
    </div>
  );
};

export default HomeChefNotification;
