import { useParams, Link } from "react-router-dom";

import { formatTime } from "../volunteers/formatDateTime";
import { useGetTodaysShiftsQuery } from "../../state/apis/volunteerApi/checkInApi";
import Loading from "../reusable/loading/Loading";

const ShiftSelect = () => {
  const { jobId } = useParams();
  const { data, isLoading } = useGetTodaysShiftsQuery();

  if (isLoading) {
    return <Loading />;
  }

  const shifts = jobId
    ? data?.jobs[jobId].shifts.map((shiftId) => data.shifts[shiftId])
    : undefined;

  if (!shifts) {
    return <h3>Something went wrong. Please start over.</h3>;
  }

  const renderShifts = () => {
    return [...shifts]
      .sort((a, b) => (new Date(a.startTime) > new Date(b.startTime) ? 1 : -1))
      .map((shift) => {
        return (
          <Link to={`../list/${shift.id}`} key={shift.id}>
            <button>
              <h4>{formatTime(shift.startTime)}</h4>
            </button>
          </Link>
        );
      });
  };

  return (
    <div>
      <h2>Select Shift for {shifts[0].jobName}</h2>
      {renderShifts()}
    </div>
  );
};

export default ShiftSelect;
