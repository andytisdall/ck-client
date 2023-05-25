import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

import * as actions from '../../../actions';
import Loading from '../../reusable/Loading';

const Confirmation = ({
  hours,
  jobs,
  getEventHours,
  getEventShifts,
  shifts,
}) => {
  const { hoursId } = useParams();
  const hour = hours && hoursId ? hours[hoursId] : null;

  useEffect(() => {
    if (!hour) {
      getEventHours();
    }
  }, [hour, getEventHours]);

  useEffect(() => {
    if (!jobs) {
      getEventShifts();
    }
  }, [jobs, getEventShifts]);

  const renderShiftDetails = () => {
    const job = jobs?.find((j) => j.id === hour?.job);
    const shift = shifts[hour.shift];
    if (hour && shift && job) {
      return (
        <div className="hc-confirm-details">
          <p>You have successfully signed up for this shift:</p>
          <ul>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Date:</span>{' '}
              {moment(hour.time).format('dddd, M/D/yy')}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Time:</span>{' '}
              {moment(shift.startTime, 'YYYY-MM-DDTHH:mm:ssZ').format('h:mm a')}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Duration:</span>{' '}
              {shift.duration} Hours
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Job:</span> {job.name}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Description:</span>
              {job.description}
            </li>
          </ul>
          <p>You have been sent an email with this information.</p>
        </div>
      );
    } else {
      return (
        <div className="hc-confirm-details">
          Could not find the details of this shift.
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Volunteer Sign Up Confirmation</h1>
      {!jobs || !hours ? <Loading /> : renderShiftDetails()}
      <Link to="/home-chef">
        <button className="hc-confirm-button">Home Chef Hub</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    hours: state.event.hours,
    jobs: state.event.jobs,
    shifts: state.event.shifts,
  };
};

export default connect(mapStateToProps, actions)(Confirmation);
