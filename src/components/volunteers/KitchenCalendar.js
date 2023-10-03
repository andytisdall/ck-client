import { connect } from 'react-redux';
import { format, utcToZonedTime } from 'date-fns-tz';
import { Link } from 'react-router-dom';

import * as actions from '../../actions';
import Calendar from '../reusable/calendar/Calendar';
import { useMemo } from 'react';
import Loading from '../reusable/loading/Loading';

const KitchenCalendar = ({ shifts, jobs }) => {
  const shiftsByDate = useMemo(() => {
    const sortedShifts = {};
    if (shifts) {
      Object.values(shifts)
        .filter((shift) => {
          const job = jobs[shift.job];
          return job?.ongoing && job.active;
        })
        .forEach((shift) => {
          const formattedTime = format(
            utcToZonedTime(shift.startTime, 'America/Los_Angeles'),
            'yyyy-MM-dd'
          );
          if (!sortedShifts[formattedTime]) {
            sortedShifts[formattedTime] = [shift];
          } else {
            sortedShifts[formattedTime].push(shift);
          }
        });
      return sortedShifts;
    }
  }, [shifts, jobs]);

  const renderShifts = (date) => {
    if (shiftsByDate[date]) {
      return shiftsByDate[date].map((sh) => {
        const job = jobs[sh.job];
        return (
          <Link key={sh.id} to={`../${sh.id}`}>
            <div>{job.name}</div>
            <div>{sh.slots} Spots Remaining</div>
          </Link>
        );
      });
    } else {
      return [];
    }
  };

  if (!shifts || !jobs) {
    return <Loading />;
  }

  return <Calendar renderItems={renderShifts} />;
};

const mapStateToProps = (state) => {
  return { shifts: state.volunteers.shifts, jobs: state.volunteers.jobs };
};

export default connect(mapStateToProps, actions)(KitchenCalendar);
