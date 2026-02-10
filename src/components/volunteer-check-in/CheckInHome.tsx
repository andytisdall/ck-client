import { Link } from "react-router-dom";

import { useGetTodaysShiftsQuery } from "../../state/apis/volunteerApi/checkInApi";
import Loading from "../reusable/loading/Loading";

const CheckInHome = () => {
  const { data, isLoading } = useGetTodaysShiftsQuery();

  if (isLoading) {
    return <Loading />;
  }

  const renderJobs = () => {
    const jobs = data?.jobs;
    if (jobs && Object.keys(jobs).length) {
      return Object.values(jobs).map((job) => {
        if (job.shifts.length > 1) {
          return (
            <Link to={`job/${job.id}`} key={job.id}>
              <button>
                <h4>{job.name}</h4>
              </button>
            </Link>
          );
        } else {
          return (
            <Link to={`list/${job.shifts[0]}`} key={job.id}>
              <button>
                <h4>{job.name}</h4>
              </button>
            </Link>
          );
        }
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
