import { Link } from 'react-router-dom';

import { useGetTodaysShiftQuery } from '../../state/apis/volunteerApi/kitchenApi';
import Loading from '../reusable/loading/Loading';

const CheckInHome = () => {
  const { data, isLoading } = useGetTodaysShiftQuery();

  const shiftId = data?.shiftId;

  if (isLoading) {
    return <Loading />;
  }

  const renderKitchenShift = () => {
    if (shiftId) {
      return (
        <Link to={`list/${shiftId}`}>
          <button>Today's CK Kitchen Volunteer Shift</button>
        </Link>
      );
    } else {
      return (
        <div className="check-in-empty">
          <p>No shifts today.</p>
        </div>
      );
    }
  };

  return <div>{renderKitchenShift()}</div>;
};

export default CheckInHome;
