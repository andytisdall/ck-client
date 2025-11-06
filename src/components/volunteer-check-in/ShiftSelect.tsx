import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

import { useGetTodaysShiftsQuery } from "../../state/apis/volunteerApi/checkInApi";
import Loading from "../reusable/loading/Loading";

const ShiftSelect = () => {
  const { jobId } = useParams();
  const { data: jobs, isLoading } = useGetTodaysShiftsQuery();

  if (isLoading) {
    return <Loading />;
  }

  const shifts = jobs && jobId ? jobs[jobId] : undefined;

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
              <h4>{format(new Date(shift.startTime), "h:mm a")}</h4>
            </button>
          </Link>
        );
      });
  };

  return (
    <div>
      <h2>Select Shift for {shifts[0].job}</h2>
      {renderShifts()}
    </div>
  );
};

export default ShiftSelect;
