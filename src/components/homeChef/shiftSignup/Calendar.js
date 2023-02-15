import { connect } from 'react-redux';
import { useState, useMemo, useCallback } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import './Calendar.css';
import Loading from '../../reusable/Loading';

const Calendar = ({ jobs, shifts }) => {
  const [month, setMonth] = useState(moment());
  const navigate = useNavigate();

  const orderedShifts = useMemo(() => {
    if (!shifts) {
      return;
    }
    const orderedByDate = {};
    Object.values(shifts).forEach((sh) => {
      const formattedTime = moment(sh.startTime).format('YYYY-MM-DD');
      if (orderedByDate[formattedTime]) {
        orderedByDate[formattedTime].push(sh);
      } else {
        orderedByDate[formattedTime] = [sh];
      }
    });
    return orderedByDate;
  }, [shifts]);

  const getDays = useCallback(() => {
    const days = [];
    const firstDay = moment(`${moment(month).format('YYYY-M')}-1`).format('d');
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i < 32; i++) {
      const date = `${moment(month).format('YYYY-M')}-${i}`;
      if (moment(date).format('M') === month.format('M')) {
        days.push(moment(date).format('YYYY-MM-DD'));
      }
    }
    return days.map((d, i) => {
      if (!d) {
        return <div key={i}></div>;
      }
      let dayShifts = [];
      if (orderedShifts[d]) {
        dayShifts = orderedShifts[d].map((sh) => {
          const jobIndex = jobs.findIndex((j) => j.id === sh.job);
          const job = jobs[jobIndex];
          const status = sh.open ? '' : 'calendar-shift-disabled';
          const link = () => navigate('../shift/' + sh.id);
          return (
            <div
              key={sh.id}
              className={`calendar-item calendar-job-${jobIndex} ${status}`}
              onClick={() => sh.open && link()}
            >
              {job.name.replace('Town Fridge', '')}
            </div>
          );
        });
      }
      return (
        <div className="calendar-date" key={d}>
          <div className="calendar-date-number">{moment(d).format('D')}</div>
          <div className="calendar-date-body">{dayShifts}</div>
        </div>
      );
    });
  }, [month, jobs, orderedShifts, navigate]);

  const calendar = () => {
    return (
      <>
        <div className="calendar-days">
          <div className="calendar-day">Sun</div>
          <div className="calendar-day">Mon</div>
          <div className="calendar-day">Tue</div>
          <div className="calendar-day">Wed</div>
          <div className="calendar-day">Thu</div>
          <div className="calendar-day">Fri</div>
          <div className="calendar-day">Sat</div>
        </div>
        <div className="calendar">{getDays()}</div>
      </>
    );
  };

  if (!jobs || !shifts) {
    return <Loading />;
  }

  return (
    <div>
      <div className="calendar-top">
        <div className="calendar-header">
          <div
            className="calendar-header-arrow"
            onClick={() => {
              const lastMonth = month.subtract(1, 'month').format();
              setMonth(moment(lastMonth));
            }}
          >
            &larr;
          </div>
          <div className="calendar-header-month">
            {moment(month).format('MMMM YYYY')}
          </div>
          <div
            className="calendar-header-arrow"
            onClick={() => {
              const nextMonth = month.add(1, 'month').format();
              setMonth(moment(nextMonth));
            }}
          >
            &rarr;
          </div>
        </div>
        <div className="calendar-header">
          <button
            onClick={() => setMonth(moment())}
            className="calendar-set-current"
          >
            Set to Current Month
          </button>
        </div>
      </div>
      <div>{calendar()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    jobs: state.homeChef.jobs,
    shifts: state.homeChef.shifts,
  };
};

export default connect(mapStateToProps)(Calendar);
