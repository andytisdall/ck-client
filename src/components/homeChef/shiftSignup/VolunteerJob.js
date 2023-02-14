import moment from 'moment';
import { useState } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import './VolunteerJob.css';

const VolunteerJob = ({ job, shifts }) => {
  const [expand, setExpand] = useState(false);

  const renderShifts = () => {
    const jobShifts = job.shifts.map((id) => shifts[id]);

    return jobShifts
      .sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
      .map((shift) => {
        return (
          <div className="job-listing" key={shift.id}>
            {shift.open ? (
              <Link to={`../shift/${shift.id}`}>
                <button>Sign Up</button>
              </Link>
            ) : (
              <div className="job-full">full</div>
            )}
            <div className={`job-date ${shift.open ? '' : 'job-date-full'}`}>
              {moment(shift.startTime).format('M/D/YY')}
            </div>
            <div className={`job-time ${shift.open ? '' : 'job-date-full'}`}>
              {moment(shift.startTime).format('dddd')}
              <span className="job-name-small"> - {job.name}</span>
            </div>
          </div>
        );
      });
  };

  const arrow = expand ? <>&darr;</> : <>&rarr;</>;

  return (
    <div className="job-container">
      <div className="job-name">
        <div className="expand-btn" onClick={() => setExpand(!expand)}>
          {arrow}
        </div>
        <h3>{job.name}</h3>
      </div>
      <div className="job-location">
        {expand && (
          <div>
            Location: <span>{job.location}</span>
          </div>
        )}
      </div>
      <div className="shift-list">{expand && renderShifts()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { shifts: state.homeChef.shifts };
};

export default connect(mapStateToProps)(VolunteerJob);
