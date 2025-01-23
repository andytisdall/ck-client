import { Link, useParams } from 'react-router-dom';

import { useGetVolunteersForCheckInQuery } from '../../state/apis/volunteerApi/kitchenApi';
import Loading from '../reusable/loading/Loading';
import { useGetSigningConfigQuery } from '../../state/apis/signApi';

const CheckInVolunteers = () => {
  const { shiftId } = useParams();

  // get api sign limit info and don't refer to sign if it's at 40
  const { data: signApiConfig } = useGetSigningConfigQuery(undefined, {
    pollingInterval: 60000,
  });
  const { data: volunteers, isLoading } = useGetVolunteersForCheckInQuery(
    shiftId || ''
  );

  if (isLoading) {
    return <Loading />;
  }

  const renderConfirmedVolunteers = () => {
    if (!signApiConfig) {
      return <Loading />;
    }
    const confirmedVols = volunteers?.filter(
      ({ status }) => status === 'Confirmed'
    );
    if (confirmedVols?.length === 0) {
      return (
        <div className="check-in-volunteer">
          <h2>All Scheduled Volunteers Are Checked In</h2>
        </div>
      );
    }
    if (confirmedVols?.length) {
      return (
        <div>
          <h2>Volunteers Not Checked In</h2>
          <div className="check-in-volunteer-list">
            {confirmedVols.map((vol) => {
              const url =
                vol.volunteerAgreement || signApiConfig.limitReached
                  ? `../confirm/${shiftId}/${vol.contactId}`
                  : `../sign/${shiftId}/${vol.contactId}`;
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

  const renderNewVolunteerBtn = () => {
    return (
      <Link to={'../create/' + shiftId}>
        <div className="check-in-volunteer-item check-in-new-volunteer-btn">
          <p>New Volunteer</p>
        </div>
      </Link>
    );
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

  return (
    <div>
      {renderNewVolunteerBtn()}
      {renderVolunteers()}
    </div>
  );
};

export default CheckInVolunteers;
