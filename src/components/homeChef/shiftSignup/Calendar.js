import { connect } from 'react-redux';

const Calendar = ({ jobs }) => {
  return <div>Cal</div>;
};

const mapStateToProps = (state) => {
  return {
    jobs: state.homeChef.jobs,
  };
};

export default connect(mapStateToProps)(Calendar);
