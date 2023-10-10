import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import './ChefShifts.css';
import Loading from '../../reusable/loading/Loading';
import {
  useGetShiftsQuery,
  VolunteerHours,
  useGetHomeChefHoursQuery,
} from '../../../state/apis/volunteerApi';
import { useGetUserInfoQuery } from '../../../state/apis/authApi';

const ChefShifts = () => {
  const [upcomingExpand, setUpcomingExpand] = useState(true);
  const [pastExpand, setPastExpand] = useState(true);

  const { data } = useGetShiftsQuery();
  const jobs = data?.jobs;
  const hours = useGetHomeChefHoursQuery().data;
  const userInfo = useGetUserInfoQuery().data;

  const renderHour = (hour: VolunteerHours) => {
    const job = jobs?.find((j) => j.id === hour.job);
    if (job) {
      return (
        <li className="chef-hours" key={hour.id}>
          <div className="chef-hours-title">
            <div className="chef-hours-date">
              {format(new Date(hour.time), 'eee, M/d/yy')}
            </div>
            <Link
              className="chef-hours-fridge"
              to={'../signup/fridge/' + job.id}
            >
              - {job.name}
            </Link>
          </div>
          <div className="chef-hours-info">
            <span className="chef-hours-meals">
              {hour.mealCount || 0} Meals
            </span>
            <Link to={`edit-shift/${hour.id}`} className="chef-hours-edit">
              edit
            </Link>
          </div>
        </li>
      );
    }
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

  const renderHours = (period: 'past' | 'upcoming') => {
    if (hours && jobs && sortedHours) {
      let status = '';
      let hoursArray: VolunteerHours[] = [];
      if (period === 'past') {
        hoursArray = [...sortedHours].reverse();
        status = 'Completed';
      } else {
        hoursArray = sortedHours;
        status = 'Confirmed';
      }
      const renderedList = hoursArray
        .filter((h) => h.status === status)
        .map((hour) => {
          return renderHour(hour);
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

  const upcomingExpanded = upcomingExpand ? 'expanded' : '';
  const pastExpanded = pastExpand ? 'expanded' : '';

  return (
    <div className="chef-shifts">
      <div className="chef-shifts-list">
        {userInfo?.firstName ? (
          <h2>{userInfo.firstName}'s Town Fridge Deliveries</h2>
        ) : null}
        {totalMeals && totalMeals > 0 ? (
          <div className="chef-total-meals">
            You have delivered {totalMeals} total meals!
          </div>
        ) : null}
        <div
          className="job-name"
          onClick={() => setUpcomingExpand(!upcomingExpand)}
        >
          <div className={`expand-btn ${upcomingExpanded}`}>&rarr;</div>
          <h3>Upcoming Deliveries</h3>
        </div>
        <div
          className={`chef-hours-list ${
            !upcomingExpand ? 'chef-hours-list-closed' : ''
          }`}
        >
          {upcomingExpand && renderHours('upcoming')}
        </div>
        <div className="job-name" onClick={() => setPastExpand(!pastExpand)}>
          <div className={`expand-btn ${pastExpanded}`}>&rarr;</div>
          <h3>Past Deliveries</h3>
        </div>
        <div
          className={`chef-hours-list ${
            !pastExpand ? 'chef-hours-list-closed' : ''
          }`}
        >
          {pastExpand && renderHours('past')}
        </div>
      </div>
      <div className="chef-images">
        <Link to="../signup/list">
          <button className="chef-signup-link">Sign Up to Deliver Meals</button>
        </Link>
        <img
          src="/images/home-chef/chef-shifts.jpeg"
          alt="Home Chef meals ready to go"
        />
      </div>
    </div>
  );
};

export default ChefShifts;
