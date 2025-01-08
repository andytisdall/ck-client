import { Link } from 'react-router-dom';

import { useGetTodaysShiftQuery } from '../../state/apis/volunteerApi/kitchenApi';
import Loading from '../reusable/loading/Loading';

const CheckInHome = () => {
  const { data: shiftId, isLoading } = useGetTodaysShiftQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Link to={`/kitchen/${shiftId}`}>
      <button>Today's CK Kitchen Volunteer Shift</button>
    </Link>
  );
};

export default CheckInHome;
