import { connect } from 'react-redux';
import { useMemo, useCallback } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import Loading from '../../reusable/Loading';
import Calendar from '../../reusable/Calendar';

const HomeChefCalendar = ({ jobs, shifts }) => {
  const navigate = useNavigate();

  const orderedShifts = useMemo(() => {
    if (!shifts) {
      return;
    }
    const orderedByDate = {};
    Object.values(shifts)
      .filter((sh) => {
        const jobIndex = jobs.findIndex((j) => j.id === sh.job);
        const job = jobs[jobIndex];
        return job?.ongoing && job.active;
      })
      .forEach((sh) => {
        const formattedTime = moment(sh.startTime, 'YYYY-MM-DD').format(
          'YYYY-MM-DD'
        );
        if (orderedByDate[formattedTime]) {
          orderedByDate[formattedTime].push(sh);
        } else {
          orderedByDate[formattedTime] = [sh];
        }
      });
    return orderedByDate;
  }, [shifts, jobs]);

  const getShifts = useCallback(
    (d) => {
      let dayShifts = [];

      if (orderedShifts[d]) {
        dayShifts = orderedShifts[d].map((sh) => {
          const jobIndex = jobs.findIndex((j) => j.id === sh.job);
          const job = jobs[jobIndex];
          const available = sh.open;
          const status = available ? '' : 'calendar-shift-disabled';
          const link = () => navigate('../shift/' + sh.id);
          return (
            <div
              key={sh.id}
              className={`calendar-item calendar-color-${jobIndex} ${status}`}
              onClick={() => available && link()}
            >
              {job.name}
            </div>
          );
        });
        return dayShifts;
      }
    },
    [jobs, navigate, orderedShifts]
  );

  if (!jobs || !shifts) {
    return <Loading />;
  }

  return <Calendar renderItems={getShifts} />;
};

const mapStateToProps = (state) => {
  return {
    jobs: state.homeChef.jobs,
    shifts: state.homeChef.shifts,
  };
};

export default connect(mapStateToProps)(HomeChefCalendar);
