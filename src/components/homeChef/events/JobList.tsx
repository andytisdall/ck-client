import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';

import { useGetEventsQuery, Job } from '../../../state/apis/volunteerApi';
import Loading from '../../reusable/loading/Loading';

const JobList = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetEventsQuery();
  const events = data;

  const event = events && id ? events.find((cam) => cam.id === id) : undefined;
  const shifts = event?.shifts;
  const jobs = event?.jobs;

  if (isLoading) {
    return <Loading />;
  }

  if (jobs && shifts) {
    return (
      <div>
        {jobs.map((j: Job) => {
          return j.shifts.map((id) => {
            const shift = shifts.find((sh) => sh.id === id);
            if (shift?.open) {
              return (
                <Link key={shift.id} to={shift.id}>
                  <li className="event-job">
                    {j.name} - {format(new Date(shift.startTime), 'h:mm a')}
                  </li>
                </Link>
              );
            } else if (shift) {
              return (
                <li key={shift.id} className="event-job full">
                  {j.name} - {format(new Date(shift.startTime), 'h:mm a')}
                </li>
              );
            } else {
              return <></>;
            }
          });
        })}
      </div>
    );
  }
  return <></>;
};

export default JobList;
