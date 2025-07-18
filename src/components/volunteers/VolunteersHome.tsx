import { useGetCampaignsQuery } from "../../state/apis/volunteerApi/campaigns";
import TextButton from "../reusable/TextButton";
import EventsList from "./events/EventsList";
import Loading from "../reusable/loading/Loading";
import { VolunteerCampaign } from "../../state/apis/volunteerApi/types";

const homeChefDescription =
  "A hub for CK Home Chefs to get started in the program, sign up for Town Fridge Deliveries, and access resources like recipes.";

const VolunteersHome = () => {
  const { data: campaigns, isLoading } = useGetCampaignsQuery();

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
