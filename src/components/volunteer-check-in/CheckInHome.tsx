import { Link } from 'react-router-dom';

import { useGetTodaysShiftsQuery } from '../../state/apis/volunteerApi/kitchenApi';
import Loading from '../reusable/loading/Loading';

const CheckInHome = () => {
  const { data: shifts, isLoading } = useGetTodaysShiftsQuery();

  if (isLoading) {
    return <Loading />;
  }

  const renderKitchenShift = () => {
    if (shifts?.length) {
      return shifts.map((shift) => {
        return (
          <Link to={`list/${shift.id}`} key={shift.id}>
            <button>{shift.job}</button>
          </Link>
        );
      });
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
