import { connect } from 'react-redux';

import VolunteerJob from './VolunteerJob';

const VolunteerJobsList = ({ jobs }) => {
  const renderJobs = () => {
    return jobs.map((job) => {
      return <VolunteerJob job={job} key={job.id} />;
    });
  };

  return <div>{jobs && renderJobs()}</div>;
};

const mapStateToProps = (state) => {
  return {
    jobs: state.homeChef.jobs,
  };
};

export default connect(mapStateToProps)(VolunteerJobsList);
