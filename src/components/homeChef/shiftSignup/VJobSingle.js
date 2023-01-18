import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import VolunteerJob from './VolunteerJob';

const VJobSingle = ({ jobs }) => {
  const { jobId } = useParams();

  return <VolunteerJob job={jobs.find((j) => j.Id === jobId)} />;
};

const mapStateToProps = (state) => {
  return {
    jobs: state.homeChef.jobs,
  };
};

export default connect(mapStateToProps)(VJobSingle);
