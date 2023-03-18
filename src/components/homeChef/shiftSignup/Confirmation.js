import { connect } from 'mongoose';
import { Link } from 'react-router-dom';

const Confirmation = ({ newHours, jobs }) => {
  const renderShiftDetails = () => {
    const job = jobs[newHours.job];
    if (newHours && job) {
      return (
        <div>
          <div>Fridge: {job.name}</div>
          <div>Date: {newHours.startTime}</div>
          <div>Number of Meals: {newHours.mealCount}</div>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Home Chef Sign Up Confirmation</h1>
      {renderShiftDetails()}
      <Link to="..">
        <button>Sign Up for More Shifts</button>
      </Link>
      <Link to="/home-chef/chef">
        <button>See your future and past shifts</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    newHours: state.homeChef.newHours,
    jobs: state.homeChef.jobs,
  };
};

export default connect(mapStateToProps)(Confirmation);
