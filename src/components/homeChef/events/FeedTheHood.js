import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import * as actions from '../../../actions';
import './FeedTheHood.css';

const FeedTheHood = ({ getEventShifts }) => {
  useEffect(() => {
    getEventShifts();
  }, [getEventShifts]);

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

export default connect(null, actions)(FeedTheHood);
