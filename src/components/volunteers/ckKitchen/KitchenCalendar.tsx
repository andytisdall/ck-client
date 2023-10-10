import { format, utcToZonedTime } from 'date-fns-tz';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

import Calendar from '../../reusable/calendar/Calendar';
import Loading from '../../reusable/loading/Loading';
import {
  useGetKitchenShiftsQuery,
  Shift,
} from '../../../state/apis/volunteerApi';

const KitchenCalendar = () => {
  const { data, isLoading } = useGetKitchenShiftsQuery();
  const shifts = data?.shifts;
  const jobs = data?.jobs;
  const shiftsByDate = useMemo(() => {
    const sortedShifts: Record<string, Shift[]> = {};
    if (shifts) {
      Object.values(shifts)
        .filter((shift) => {
          const job = jobs?.find((j) => j.id === shift.job);
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

  const renderShifts = (date: string) => {
    if (shiftsByDate && shiftsByDate[date]) {
      return shiftsByDate[date].map((sh) => {
        const job = jobs ? jobs.find((j) => j.id === sh.job) : undefined;
        return (
          <Link key={sh.id} to={`../${sh.id}`}>
            <div>{job?.name}</div>
            <div>{sh.slots} Spots Remaining</div>
          </Link>
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
