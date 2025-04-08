import { Link } from 'react-router-dom';

const NotificationsHome = () => {
  return (
    <div>
      <Link className="text-button-link admin-home-btn" to="home-chef">
        Send a push notification to Home Chef app users
      </Link>
      <Link className="text-button-link admin-home-btn" to="d4j">
        Send a push notification to Dining for Justice app users
      </Link>
    </div>
  );
};

export default NotificationsHome;
