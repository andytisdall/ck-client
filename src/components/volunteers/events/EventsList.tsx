import { format, utcToZonedTime } from "date-fns-tz";

import Loading from "../../reusable/loading/Loading";
import TextButton from "../../reusable/TextButton";
import { useGetCampaignsQuery } from "../../../state/apis/volunteerApi/campaigns";

const EventsList = () => {
  const { data: campaigns, isLoading } = useGetCampaignsQuery();

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
            if (!cam.description) {
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
              description = cam.description;
            }

            return (
              <TextButton
                key={cam.id}
                buttonText={cam.name}
                descriptionText={description}
                to={`signup/${cam.id}`}
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
