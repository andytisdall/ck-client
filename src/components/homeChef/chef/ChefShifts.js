import { connect } from 'react-redux';
import { useEffect, useMemo } from 'react';
import moment from 'moment';

import './ChefShifts.css';
import { getHours, getShifts } from '../../../actions';
import Loading from '../../reusable/Loading';

const ChefShifts = ({ jobs, getHours, hours, getShifts }) => {
  useEffect(() => {
    getShifts();
    getHours();
  }, [getHours, getShifts]);

  const sortedHours = useMemo(() => {
    if (hours) {
      return [...Object.values(hours)].sort((a, b) =>
        a.time > b.time ? 1 : -1
      );
    }
  }, [hours]);

  const renderHours = (period) => {
    if (hours && jobs) {
      let filterFunc;
      let hoursArray;
      if (period === 'past') {
        hoursArray = [...sortedHours].reverse();
        filterFunc = (h) => h.time < moment().format();
      } else {
        hoursArray = sortedHours;
        filterFunc = (h) => h.time > moment().format();
      }
      const renderedList = hoursArray.filter(filterFunc).map((hour) => {
        return (
          <div className="chef-hours" key={hour.id}>
            {moment(hour.time).format('M/D/YY')} -{' '}
            {jobs.find((j) => j.id === hour.job).name} - {hour.mealCount} Meals
          </div>
        );
      });
      if (renderedList.length) {
        return renderedList;
      } else {
        return <p>No Shifts</p>;
      }
    }
  };

  if (!hours || !jobs) {
    return <Loading />;
  }

  return (
    <div>
      <h3>Upcoming Shifts: </h3>
      <div className="chef-hours-list">{renderHours('upcoming')}</div>
      <h3>Past Shifts:</h3>
      <div className="chef-hours-list">{renderHours('past')}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    jobs: state.homeChef.jobs,
    hours: state.homeChef.hours,
  };
};

export default connect(mapStateToProps, { getHours, getShifts })(ChefShifts);
