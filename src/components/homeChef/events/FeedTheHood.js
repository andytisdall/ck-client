import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import * as actions from '../../../actions';
import './FeedTheHood.css';

const FeedTheHood = ({ getEventShifts, hours, getEventHours }) => {
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
      <h1>Feed the Hood</h1>
      <p>
        Sign up to prepare taco toppings for East Oakland Collective's Feed the
        Hood 25! EOC will be distributing taco meals to our unhoused neighbors
        across Oakland on Sunday, May 28th. Volunteers will pick up produce on
        Tuesday 5/23, 4-5pm at Xingones, prep produce at home and deliver to
        East Oakland Collective, 10-4pm on Friday, May 26.
      </p>
      <h4>Sign Up for a Job</h4>
      <Outlet />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { hours: state.event.hours };
};

export default connect(mapStateToProps, actions)(FeedTheHood);
