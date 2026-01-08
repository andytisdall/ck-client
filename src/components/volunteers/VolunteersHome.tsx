import { useGetCampaignsQuery } from "../../state/apis/volunteerApi/campaigns";
import TextButton from "../reusable/TextButton";
import EventsList from "./events/EventsList";
import Loading from "../reusable/loading/Loading";
import { VolunteerCampaign } from "../../state/apis/volunteerApi/types";

const homeChefDescription =
  "A hub for CK Home Chefs to get started in the program, sign up for Town Fridge Deliveries, and access resources like recipes.";

const VolunteersHome = () => {
  const { data: campaigns, isLoading } = useGetCampaignsQuery();

  const renderAnnouncement = () => {
    return (
      <a href="https://www.classy.org/event/a-tamale-making-master-class-with-chef-reyna-maldonado/e739089">
        <div className="volunteers-home-ad">
          <img
            src="https://assets.classy.org/31865501/7a60f9c4-ba9b-11f0-a703-0eb66cefea69.jpg"
            alt="Chef Ofelia Barajas"
          />
          <div>
            <h3>The Recipe for Home: A Tamales Workshop by Las Guerreras</h3>
            <p>
              Chef Ofelia Barajas is the chef and owner of Las Guerreras, one of
              Oakland's top spots for authentic Mexican cuisine. On Saturday,
              December 6th, you'll have an opportunity to learn the art of
              tamale-making from Chef Ofelia at a special event at the CK
              Kitchen! Click here to reserve your spot.
            </p>
          </div>
        </div>
      </a>
    );
  };

  const renderOngoingCampaign = (cam: VolunteerCampaign) => {
    const link = `signup/${cam.id}`;

    return (
      <TextButton
        key={cam.id}
        to={link}
        descriptionText={cam.description!}
        buttonText={cam.name}
      />
    );
  };

  const renderOngoing = () => {
    return (
      <div className="volunteers-home-section">
        {/* {renderAnnouncement()} */}
        <div className="volunteers-home-section-title">
          Ongoing Volunteer Programs
        </div>
        <div className="volunteers-home-section-body">
          <TextButton
            to="../home-chef"
            descriptionText={homeChefDescription}
            buttonText="Home Chef Volunteers"
          />
          {isLoading ? (
            <Loading />
          ) : (
            campaigns
              ?.filter((cam) => !cam.startDate)
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((cam) => renderOngoingCampaign(cam))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="volunteers-home">
      {renderOngoing()}
      {!isLoading && <EventsList />}
      <img
        src="/images/volunteers/volunteer-group.jpg"
        alt="A group of CK Kitchen volunteers"
        className="volunteers-home-img volunteers-photo-frame"
      />
    </div>
  );
};

export default VolunteersHome;
