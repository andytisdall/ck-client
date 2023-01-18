import { connect } from 'react-redux';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

import VolunteerJob from './VolunteerJob';

const VolunteerJobsList = ({ jobs }) => {
  const renderJobs = () => {
    return jobs.map((job) => {
      return <VolunteerJob job={job} key={job.id} />;
    });
  };

  return (
    <div className="jobs-list">
      {jobs.length ? renderJobs() : <Spinner size={20} color="black" />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    jobs: state.homeChef.jobs,
  };
};

export default connect(mapStateToProps)(VolunteerJobsList);
