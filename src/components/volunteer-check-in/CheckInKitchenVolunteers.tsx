import { Link, useParams } from 'react-router-dom';

import { useGetVolunteersForCheckInQuery } from '../../state/apis/volunteerApi/kitchenApi';
import Loading from '../reusable/loading/Loading';

const CheckInVolunteers = () => {
  const { shiftId } = useParams();

  const { data: volunteers, isLoading } = useGetVolunteersForCheckInQuery(
    shiftId || ''
  );

  if (isLoading) {
    return <Loading />;
  }

  const renderConfirmedVolunteers = () => {
    const confirmedVols = volunteers?.filter(
      ({ status }) => status === 'Confirmed'
    );
    if (confirmedVols?.length === 0) {
      return (
        <div className="check-in-volunteer">
          <h2>All Volunteers Are Checked In!</h2>
        </div>
      );
    }
    if (confirmedVols?.length) {
      return (
        <div>
          <h2>Check In Here</h2>
          <div className="check-in-volunteer-list">
            {confirmedVols.map((vol) => {
              const url = vol.volunteerAgreement
                ? `../confirm/${vol.contactId}`
                : `../sign/${vol.contactId}`;
              return (
                <Link
                  key={vol.hoursId}
                  to={url}
                  className="check-in-volunteer-item"
                >
                  <p>
                    {vol.firstName} {vol.lastName}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      );
    }
  };

  const renderCheckedInVolunteers = () => {
    const checkedInVols = volunteers?.filter(
      ({ status }) => status === 'Completed'
    );
    if (checkedInVols?.length) {
      return (
        <div>
          <h3>Checked In</h3>
          {checkedInVols.map((vol) => {
            return (
              <ul key={vol.hoursId}>
                <li>
                  {vol.firstName} {vol.lastName}
                </li>
              </ul>
            );
          })}
        </div>
      );
    }
  };

  const renderVolunteers = () => {
    if (!volunteers) {
      return <p>Error getting volunteer info.</p>;
    }
    if (volunteers.length) {
      return (
        <>
          {renderConfirmedVolunteers()}
          {renderCheckedInVolunteers()}
        </>
      );
    }
    return <p>No volunteers found for today.</p>;
  };

  return <div>{renderVolunteers()}</div>;
};

export default CheckInVolunteers;
