import { Outlet, useParams } from 'react-router-dom';

import './VolunteerEvent.css';
import Loading from '../../reusable/loading/Loading';
import { useGetEventsQuery } from '../../../state/apis/volunteerApi';

const VolunteerEvent = () => {
  const { id } = useParams();
  const events = useGetEventsQuery().data;

  const campaign = events?.find((c) => c.id === id);

  if (!campaign) {
    return <Loading />;
  }

  return (
    <div>
      <h1>{campaign.name}</h1>
      <p>{campaign.description}</p>
      <h4>Sign Up for a Job</h4>
      <Outlet />
    </div>
  );
};

export default VolunteerEvent;
