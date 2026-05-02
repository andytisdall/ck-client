import { BallersRSVPArgs, useGetRSVPsQuery } from "../../state/apis/formApi";
import Loading from "../reusable/loading/Loading";

const RSVP = () => {
  const { data: RSVPs, isLoading } = useGetRSVPsQuery();
  const renderRSVP = (rsvp: BallersRSVPArgs["formData"]) => {
    return (
      <div key={rsvp.email}>
        <hr />
        <ul>
          <li>
            <strong>Name:</strong>. {rsvp.name}
          </li>
          <li>
            <strong>Email:</strong> {rsvp.email}
          </li>
          <li>
            <strong>Number of People:</strong> {rsvp.numberOfPeople}
          </li>
          <li>
            <strong>Want Addditional Tickets?</strong>
            {"   "}
            {rsvp.additional ? "Yes" : "No"}
          </li>
          <li>
            <strong>Number of Additional Tickets:</strong>
            {"   "}
            {rsvp.numberOfAdditional}
          </li>
        </ul>
      </div>
    );
  };
  return (
    <div>
      <h1>Ballers RSVPS</h1>
      <div>
        {isLoading ? (
          <Loading />
        ) : !RSVPs ? (
          "Error gettings RSVPs"
        ) : !RSVPs.length ? (
          "No RSVPs found."
        ) : (
          RSVPs.map(renderRSVP)
        )}
      </div>
    </div>
  );
};

export default RSVP;
