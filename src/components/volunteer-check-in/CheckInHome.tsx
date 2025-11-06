import { Link } from "react-router-dom";

import { useGetTodaysShiftsQuery } from "../../state/apis/volunteerApi/checkInApi";
import Loading from "../reusable/loading/Loading";

const CheckInHome = () => {
  const { data: jobs, isLoading } = useGetTodaysShiftsQuery();

  if (isLoading) {
    return <Loading />;
  }

  const renderJobs = () => {
    if (jobs && Object.keys(jobs).length) {
      return Object.keys(jobs).map((job) => {
        const jobName = jobs[job][0].job;
        if (jobs[job].length > 1) {
          return (
            <Link to={`job/${job}`} key={job}>
              <button>
                <h4>{jobName}</h4>
              </button>
            </Link>
          );
        } else {
          return (
            <Link to={`list/${jobs[job][0].id}`} key={job}>
              <button>
                <h4>{jobName}</h4>
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
