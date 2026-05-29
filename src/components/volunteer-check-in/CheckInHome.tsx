import { Link } from "react-router-dom";

import { useGetTodaysShiftsQuery } from "../../state/apis/volunteerApi/checkInApi";
import Loading from "../reusable/loading/Loading";

const CheckInHome = () => {
  const { data, isLoading } = useGetTodaysShiftsQuery();

  if (isLoading) {
    return <Loading />;
  }

  const renderJobs = () => {
    const jobsList = data ? Object.values(data.jobs) : undefined;
    if (jobsList?.length) {
      return jobsList.map((job) => {
        const link =
          job.shifts.length > 1 ? `job/${job.id}` : `list/${job.shifts[0]}`;
        return (
          <Link to={link} key={job.id}>
            <button>
              <h4>{job.name}</h4>
            </button>
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

  return (
    <div>
      <h2>Today's Volunteer Jobs</h2>
      {renderJobs()}
    </div>
  );
};

export default CheckInHome;
