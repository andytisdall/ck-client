import { useSelector } from "react-redux";

import { useGetCampaignsQuery } from "../../state/apis/volunteerApi";
import TextButton from "../reusable/TextButton";
import EventsList from "./events/EventsList";
import Loading from "../reusable/loading/Loading";
import { useGetUserQuery } from "../../state/apis/authApi";
import { RootState } from "../../state/store";

const homeChefDescription =
  "A hub for CK Home Chefs to get started in the program, sign up for Town Fridge Deliveries, and access resources like recipes.";

const VolunteersHome = () => {
  const { data: campaigns, isLoading } = useGetCampaignsQuery();

  const { data } = useGetUserQuery();
  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer
  );

  const renderOngoingCampaign = (campaignName: string) => {
    const cam = campaigns?.find((c) => c.name === campaignName);
    if (cam) {
      const link = data || volunteer ? "signup" : "signin";

      return (
        <TextButton
          to={`ck-kitchen/${link}/${cam.id}`}
          descriptionText={cam.description!}
          buttonText={cam.name}
        />
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
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {renderOngoingCampaign("CK Kitchen Volunteers")}
              {renderOngoingCampaign("Door Distribution")}
            </>
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
