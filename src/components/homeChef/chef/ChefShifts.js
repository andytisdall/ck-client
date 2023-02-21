import { connect } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './ChefShifts.css';
import { getHours, getShifts } from '../../../actions';
import Loading from '../../reusable/Loading';

const ChefShifts = ({ jobs, getHours, hours, getShifts, user }) => {
  const [upcomingExpand, setUpcomingExpand] = useState(false);
  const [pastExpand, setPastExpand] = useState(false);

  useEffect(() => {
    getShifts();
    getHours();
  }, [getHours, getShifts]);

  const renderShift = (shift) => {
    const job = jobs.find((j) => j.id === shift.job);
    return (
      <li className="chef-hours" key={shift.id}>
        <span className="chef-hours-date">
          {moment(shift.time).format('M/D/YY')}
        </span>{' '}
        - <Link to={'../signup/fridge/' + job.id}>{job.name}</Link> -{' '}
        <span className="chef-hours-meals">{shift.mealCount || 0} Meals</span>
        <Link to={`edit-shift/${shift.id}`} className="chef-hours-edit">
          edit
        </Link>
      </li>
    );
  };

  const sortedHours = useMemo(() => {
    if (hours) {
      return [...Object.values(hours)].sort((a, b) =>
        a.time > b.time ? 1 : -1
      );
    }
  }, [hours]);

  const totalMeals = useMemo(() => {
    if (hours) {
      return Object.values(hours)
        .filter((h) => h.status === 'Completed')
        .reduce((total, current) => total + parseInt(current.mealCount), 0);
    }
  }, [hours]);

  const renderHours = (period) => {
    if (hours && jobs) {
      let status;
      let hoursArray;
      if (period === 'past') {
        hoursArray = [...sortedHours].reverse();
        status = 'Completed';
        // filterFunc = (h) => h.time < moment().format();
      } else {
        hoursArray = sortedHours;
        status = 'Confirmed';
        // filterFunc = (h) => h.time > moment().format();
      }
      const renderedList = hoursArray
        .filter((h) => h.status === status)
        .map((hour) => {
          return renderShift(hour);
        });
      if (renderedList.length) {
        return <ul>{renderedList}</ul>;
      } else {
        return <p>No Shifts</p>;
      }
    }
  };

  if (!hours || !jobs) {
    return <Loading />;
  }

  const upcomingArrow = upcomingExpand ? <>&darr;</> : <>&rarr;</>;
  const pastArrow = pastExpand ? <>&darr;</> : <>&rarr;</>;

  return (
    <div>
      {user.firstName ? (
        <h2>{user.firstName}'s Town Fridge Deliveries</h2>
      ) : null}
      {totalMeals && totalMeals > 0 ? (
        <div className="chef-total-meals">
          You have delivered {totalMeals} total meals!
        </div>
      ) : null}
      <div className="job-name">
        <div
          className="expand-btn"
          onClick={() => setUpcomingExpand(!upcomingExpand)}
        >
          {upcomingArrow}
        </div>
        <h3>Upcoming Deliveries</h3>
      </div>
      {upcomingExpand && (
        <div className="chef-hours-list">{renderHours('upcoming')}</div>
      )}
      <div className="job-name">
        <div className="expand-btn" onClick={() => setPastExpand(!pastExpand)}>
          {pastArrow}
        </div>
        <h3>Past Deliveries</h3>
      </div>
      {pastExpand && (
        <div className="chef-hours-list">{renderHours('past')}</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    jobs: state.homeChef.jobs,
    hours: state.homeChef.hours,
    user: state.user.user,
  };
};

export default connect(mapStateToProps, { getHours, getShifts })(ChefShifts);
