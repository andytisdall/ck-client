import { connect } from 'react-redux';

import * as actions from '../../actions';
import GetVolunteer from './GetVolunteer';
import { useParams } from 'react-router-dom';
import Loading from '../reusable/Loading';
import useLoading from '../../hooks/useLoading';

const SignIn = ({ volunteer, user, signUpForVolunteerShift, shifts, jobs }) => {
  const { shiftId } = useParams();
  const [loading, setLoading] = useLoading();
  if (loading || !shifts || !jobs) {
    return <Loading />;
  }
  if (!shifts[shiftId]) {
    return <div>Volunteer shift not found. Please start over.</div>;
  }
  if (!user && !volunteer) {
    return <GetVolunteer />;
  }
  const shift = shifts[shiftId];
  const job = jobs[shift.job];
  const date = shift.startTime;
  if (user) {
    setLoading(true);
    signUpForVolunteerShift(shift.id, job.id, date, user.salesforceId);
  }
  if (volunteer) {
    setLoading(true);
    signUpForVolunteerShift(shift.id, job.id, date, volunteer.id);
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    volunteer: state.volunteers.volunteer,
    shifts: state.volunteers.shifts,
    jobs: state.volunteers.jobs,
  };
};

export default connect(mapStateToProps, actions)(SignIn);
