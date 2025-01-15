import { useParams, useNavigate } from 'react-router-dom';

import {
  useGetVolunteersForCheckInQuery,
  useCheckInVolunteerMutation,
} from '../../state/apis/volunteerApi/kitchenApi';
import Loading from '../reusable/loading/Loading';

const CheckInConfirm = () => {
  const { contactId, shiftId } = useParams();

  const { data: volunteers, isLoading } = useGetVolunteersForCheckInQuery(
    shiftId || ''
  );

  const [checkInVolunteer, { isLoading: checkInLoading }] =
    useCheckInVolunteerMutation();

  const navigate = useNavigate();

  const volunteer = volunteers?.find((vol) => vol.contactId === contactId);

  const handleCheckIn = async () => {
    if (volunteer?.hoursId) {
      await checkInVolunteer({ hoursId: volunteer.hoursId });
      navigate('../success/' + shiftId);
    }
  };

  const renderStartOverBtn = () => {
    return (
      <button className="cancel" onClick={() => navigate('../list/' + shiftId)}>
        Start Over
      </button>
    );
  };

  const renderCheckIn = () => {
    if (checkInLoading) {
      return <Loading />;
    }
    if (!volunteer) {
      return (
        <div className="check-in-volunteer">
          <p>Could not find this volunteer. Please start over</p>
        </div>
      );
    }
    return (
      <div className="check-in-volunteer">
        <h2>
          {volunteer.firstName} {volunteer.lastName}
        </h2>
        <button onClick={handleCheckIn}>Check In</button>
      </div>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="check-in-volunteer">
      {renderCheckIn()}
      {renderStartOverBtn()}
    </div>
  );
};

export default CheckInConfirm;
