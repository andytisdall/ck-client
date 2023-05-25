import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import * as actions from '../../../actions';
import './VolunteerEvent.css';

const VolunteerEvent = ({ getEventShifts, hours, getEventHours }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getEventShifts();
    getEventHours();
  }, [getEventShifts, getEventHours]);

  const hoursList = hours ? Object.values(hours) : null;
  const hour = hoursList?.length ? hoursList[0] : null;

  useEffect(() => {
    if (hour) {
      navigate('../signup-confirm/' + hour.id);
    }
  }, [navigate, hour]);

  return (
    <div>
      <h1>OAK Community Health Fair</h1>
      <p>
        Join us at the City of Oakland's Community Health Fair on Saturday, June
        3rd, for an engaging and informative event that aims to raise awareness
        about the dangers of consuming Sugar-Sweetened Beverages (SSBs) and
        celebrate the impact of SSB Community Grants. As a SSB grant recipient,
        Community Kitchens will have an information booth to share about the CK
        Home Chef program and town fridge meals. Share your volunteer experience
        and tell others about our program!
      </p>
      <h4>Sign Up for a Job</h4>
      <Outlet />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { hours: state.event.hours };
};

export default connect(mapStateToProps, actions)(VolunteerEvent);
