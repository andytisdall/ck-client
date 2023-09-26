import { connect } from 'react-redux';

import GetVolunteer from './GetVolunteer';

const VolunteerSignIn = ({ volunteer }) => {
  if (!volunteer) {
    return <GetVolunteer />;
  } else {
    return <h3>Volunteer Found: {volunteer.name}</h3>;
  }
};

const mapStateToProps = (state) => {
  return { volunteer: state.volunteers.volunteer };
};
export default connect(mapStateToProps)(VolunteerSignIn);
