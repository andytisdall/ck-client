import { format, utcToZonedTime } from 'date-fns-tz';

import Loading from '../reusable/loading/Loading';
import TextButton from '../reusable/TextButton';
import { useGetEventsQuery } from '../../state/apis/volunteerApi';

const homeChefDescription =
  'A hub for CK Home Chefs to get started in the program, sign up for Town Fridge Deliveries, and access resources like recipes.';

const ckKitchenDescription = 'Sign up to help out in the CK Kitchen.';

const VolunteersHome = () => {
  const { data: eventCampaigns, isLoading } = useGetEventsQuery();
  const renderEvents = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (eventCampaigns?.length) {
      return (
        <div className="volunteers-home-section">
          <div className="volunteers-home-section-title">
            Special Event Volunteer Opportunities
          </div>
          <div className="volunteers-home-section-body">
            {eventCampaigns.map((cam) => {
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

              return (
                <TextButton
                  key={cam.id}
                  buttonText={cam.name}
                  descriptionText={description}
                  to={`events/signup/${cam.id}`}
                />
              );
            })}
          </div>
        </div>
      );
    }
  };

  const renderOngoing = () => {
    return (
      <div className="volunteers-home-section">
        <div className="volunteers-home-section-title">
          Ongoing Volunteer Programs
        </div>
        <div className="volunteers-home-section-body">
          <TextButton
            to="../home-chef"
            descriptionText={homeChefDescription}
            buttonText="Home Chef Volunteers"
          />
          <TextButton
            to="ck-kitchen"
            descriptionText={ckKitchenDescription}
            buttonText="CK Kitchen Volunteers"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="volunteers-home">
      {renderOngoing()}
      {renderEvents()}
      <img
        src="/images/volunteers/volunteer-group.jpg"
        alt="A group of CK Kitchen volunteers"
        className="volunteers-home-img volunteers-photo-frame"
      />
    </div>
  );
};

export default VolunteersHome;
