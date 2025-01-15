import { Link } from 'react-router-dom';

import { useGetTodaysShiftQuery } from '../../state/apis/volunteerApi/kitchenApi';
import Loading from '../reusable/loading/Loading';

const CheckInHome = () => {
  const { data, isLoading } = useGetTodaysShiftQuery();

  const shiftId = data?.shiftId;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Link to={`list/${shiftId}`}>
      <button>Today's CK Kitchen Volunteer Shift</button>
    </Link>
  );
};

export default CheckInHome;
