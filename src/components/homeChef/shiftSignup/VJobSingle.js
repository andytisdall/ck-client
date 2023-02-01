import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from '../../reusable/Loading';
import VolunteerJob from './VolunteerJob';

const VJobSingle = ({ jobs }) => {
  const { jobId } = useParams();

  if (!jobs) {
    return <Loading />;
  }

  const job = jobs.find((j) => j.id === jobId);

  return <VolunteerJob job={job} />;
};

const mapStateToProps = (state) => {
  return {
    jobs: state.homeChef.jobs,
  };
};

export default connect(mapStateToProps)(VJobSingle);
