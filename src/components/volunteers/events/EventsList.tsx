import { useSelector } from 'react-redux';
import { format, utcToZonedTime } from 'date-fns-tz';

import { useGetEventsQuery } from '../../../state/apis/volunteerApi';
import { useGetUserQuery } from '../../../state/apis/authApi';
import { RootState } from '../../../state/store';
import Loading from '../../reusable/loading/Loading';
import TextButton from '../../reusable/TextButton';

const EventsList = () => {
  const { data: eventCampaigns, isLoading } = useGetEventsQuery();
  const { data: user } = useGetUserQuery();
  const volunteer = useSelector((state: RootState) => {
    return state.volunteer.volunteer;
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!eventCampaigns?.length) {
    return <></>;
  }

  const renderEvents = eventCampaigns.map((cam) => {
    let description = '';
    if (!cam.buttonText) {
      const startDate = cam.startDate
        ? format(
            utcToZonedTime(cam.startDate, 'America/Los_Angeles'),
            'eeee, MMMM do'
          )
        : '';
      const endDate = cam.endDate
        ? ' - ' +
          format(
            utcToZonedTime(cam.endDate, 'America/Los_Angeles'),
            'eeee, MMMM do'
          )
        : '';
      description = startDate + endDate;
    } else {
      description = cam.buttonText;
    }

    const link = user || volunteer ? 'signup' : 'signin';

    return (
      <TextButton
        key={cam.id}
        buttonText={cam.name}
        descriptionText={description}
        to={`events/${link}/${cam.id}`}
      />
    );
  });

  return (
    <div className="volunteers-home-section">
      <div className="volunteers-home-section-title">
        Special Event Volunteer Opportunities
      </div>
      <div className="volunteers-home-section-body">{renderEvents}</div>
    </div>
  );
};

export default EventsList;
