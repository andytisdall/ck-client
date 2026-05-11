import { useGetRSVPsQuery } from "../../../state/apis/formApi";
import Loading from "../../reusable/loading/Loading";
import RSVPItem from "./RSVPItem";

const RSVPList = () => {
  const { data: RSVPs, isLoading } = useGetRSVPsQuery();

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
          RSVPs.map((rsvp) => <RSVPItem rsvp={rsvp} key={rsvp.id} />)
        )}
      </div>
      <hr />
      <div>
        <h3>
          Total RSVPs:{" "}
          <span>
            {RSVPs?.reduce(
              (prev, cur) =>
                prev +
                parseInt(cur.numberOfPeople || "0") +
                parseInt(cur.numberOfAdditional || "0"),
              0,
            )}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default RSVPList;
