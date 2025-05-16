import { format, utcToZonedTime } from "date-fns-tz";
import { useSelector } from "react-redux";

import { RootState } from "../../../state/store";
import Loading from "../../reusable/loading/Loading";
import TextButton from "../../reusable/TextButton";
import { useGetCampaignsQuery } from "../../../state/apis/volunteerApi";
import { useGetUserQuery } from "../../../state/apis/authApi";

const EventsList = () => {
  const { data: campaigns, isLoading } = useGetCampaignsQuery();
  const { data: user } = useGetUserQuery();
  const volunteer = useSelector((state: RootState) => {
    return state.volunteer.volunteer;
  });

  const eventCampaigns = campaigns?.filter((cam) => cam.startDate);

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
            let description = "";
            if (!cam.buttonText) {
              const startDate = cam.startDate
                ? format(
                    utcToZonedTime(cam.startDate, "America/Los_Angeles"),
                    "eeee, MMMM do"
                  )
                : "";
              const endDate = cam.endDate
                ? " - " +
                  format(
                    utcToZonedTime(cam.endDate, "America/Los_Angeles"),
                    "eeee, MMMM do"
                  )
                : "";
              description = startDate + endDate;
            } else {
              description = cam.buttonText;
            }

            const link = user || volunteer ? "signup" : "signin";

            return (
              <TextButton
                key={cam.id}
                buttonText={cam.name}
                descriptionText={description}
                to={`events/${link}/${cam.id}`}
              />
            );
          })}
        </div>
      </div>
    );
  }
  return <></>;
};

export default EventsList;
