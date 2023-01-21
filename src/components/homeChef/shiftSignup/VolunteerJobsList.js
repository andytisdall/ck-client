import { connect } from 'react-redux';

import VolunteerJob from './VolunteerJob';
import Loading from '../../reusable/Loading';

const VolunteerJobsList = ({ jobs }) => {
  const renderJobs = () => {
    return jobs.map((job) => {
      return <VolunteerJob job={job} key={job.id} />;
    });
  };

  return (
    <div className="jobs-list">{jobs.length ? renderJobs() : <Loading />}</div>
  );
};

const mapStateToProps = (state) => {
  return {
    jobs: state.homeChef.jobs,
  };
};

export default connect(mapStateToProps)(VolunteerJobsList);
