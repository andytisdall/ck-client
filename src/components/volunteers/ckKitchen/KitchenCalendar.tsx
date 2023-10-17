import { format, utcToZonedTime } from 'date-fns-tz';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

import Calendar from '../../reusable/calendar/Calendar';
import Loading from '../../reusable/loading/Loading';
import {
  useGetKitchenShiftsQuery,
  Shift,
} from '../../../state/apis/volunteerApi';

const KitchenCalendar = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetKitchenShiftsQuery();
  const shifts = data?.shifts;
  const jobs = data?.jobs;

  const shiftsByDate = useMemo(() => {
    const sortedShifts: Record<string, Shift[]> = {};
    if (shifts) {
      Object.values(shifts)
        .filter((shift) => {
          const job = jobs?.find((j) => j.id === shift.job);
          return job?.ongoing && job.active && shift.open;
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

  const renderShifts = (date: string) => {
    if (shiftsByDate && shiftsByDate[date]) {
      return shiftsByDate[date].map((sh) => {
        const job = jobs ? jobs.find((j) => j.id === sh.job) : undefined;
        return (
          <div
            key={sh.id}
            className="calendar-item calendar-color-0"
            onClick={() => navigate(`../${sh.id}`)}
          >
            <div>{job?.name}</div>
            <div>{sh.slots} Spots Remaining</div>
          </div>
        );
      });
    } else {
      return [];
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return <Calendar renderItems={renderShifts} />;
};

export default KitchenCalendar;
