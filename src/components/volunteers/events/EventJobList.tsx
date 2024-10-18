import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { RootState } from '../../../state/store';
import { useGetUserQuery } from '../../../state/apis/authApi';
import {
  useGetEventsQuery,
  useGetEventHoursQuery,
} from '../../../state/apis/volunteerApi';
import Loading from '../../reusable/loading/Loading';
import JobList from '../JobList';

const EventJobList = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetEventsQuery();
  const events = data;

  const event = events && id ? events.find((cam) => cam.id === id) : undefined;
  const shifts = event?.shifts;
  const jobs = event?.jobs;

  const { volunteer } = useSelector((state: RootState) => ({
    volunteer: state.volunteer.volunteer,
  }));

  const { data: user } = useGetUserQuery();

  const { data: hours } = useGetEventHoursQuery({
    campaignId: id || '',
    contactId: volunteer?.id || user?.salesforceId || '',
  });

  if (isLoading) {
    return <Loading />;
  }

  if (jobs && shifts && hours && id) {
    return (
      <JobList jobs={jobs} shifts={shifts} hours={hours} campaignId={id} />
    );
  }
  return (
    <div>
      Could not find information about this event. Please try again later.
    </div>
  );
};

export default EventJobList;
