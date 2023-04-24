import { connect } from 'react-redux';

import VolunteerJob from './VolunteerJob';
import Loading from '../../reusable/Loading';

const VolunteerJobsList = ({ jobs }) => {
  const renderJobs = () => {
    if (!jobs.length) {
      return 'No jobs could be found.';
    }
    return jobs
      .filter((job) => job.ongoing)
      .map((job) => {
        return <VolunteerJob job={job} key={job.id} />;
      });
  };

  return <div className="jobs-list">{jobs ? renderJobs() : <Loading />}</div>;
};

const mapStateToProps = (state) => {
  return {
    jobs: state.homeChef.jobs,
  };
};

export default connect(mapStateToProps)(VolunteerJobsList);
