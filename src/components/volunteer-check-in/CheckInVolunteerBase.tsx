import { Outlet } from 'react-router-dom';
import { format } from 'date-fns';

import { useGetUserQuery } from '../../state/apis/authApi';
import '../header/Header.css';
import './volunteerCheckIn.css';
import Loading from '../reusable/loading/Loading';

const CheckInVolunteerBase = () => {
  const { data: user, isLoading } = useGetUserQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (!user?.admin) {
    return (
      <div className="main check-in">
        <h2>You do not have permission to use this page.</h2>
      </div>
    );
  }

  return (
    <div className="main check-in">
      <div className="check-in-header-container">
        <div className="check-in-header">
          <img
            src="/images/logos/ck-logo.png"
            alt="ck logo"
            className="header-logo"
          />
          <h1>Volunteer Check-In</h1>
        </div>
        <p>{format(new Date(), 'eeee, M/d/yy')}</p>
      </div>
      <Outlet />
    </div>
  );
};

export default CheckInVolunteerBase;
