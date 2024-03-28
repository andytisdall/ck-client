import { format } from 'date-fns';

import NotificationForm from './NotificationForm';
import {
  useSendD4JNotificationMutation,
  useGetD4JNotificationsQuery,
} from '../../../state/apis/d4jApi';
import Loading from '../../reusable/loading/Loading';

const HomeChefNotification = () => {
  const [sendD4JNotification, { isLoading }] = useSendD4JNotificationMutation();

  const { data: pastNotifications, isLoading: pastLoading } =
    useGetD4JNotificationsQuery();

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
        Send a <span className="admin-app-name">Dining for Justice App</span>{' '}
        Push Notification
      </h2>
      <NotificationForm onSubmit={sendD4JNotification} isLoading={isLoading} />
      {pastLoading ? <Loading /> : renderPastNotifications()}
    </div>
  );
};

export default HomeChefNotification;
