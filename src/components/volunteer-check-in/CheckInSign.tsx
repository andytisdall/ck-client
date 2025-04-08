import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetVolunteersForCheckInQuery } from "../../state/apis/volunteerApi/checkInApi";
import Loading from "../reusable/loading/Loading";

const CheckInSign = () => {
  const { contactId, shiftId } = useParams();

  const { data: volunteers, isLoading } = useGetVolunteersForCheckInQuery(
    shiftId || ""
  );
  const volunteer = volunteers?.find((vol) => vol.contactId === contactId);

  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (!volunteer || !shiftId) {
    return (
      <div className="check-in-volunteer">
        <p>There's been an error. Please start over.</p>
        <button
          onClick={() => navigate("../../list/" + shiftId)}
          className="cancel"
        >
          Start Over
        </button>
      </div>
    );
  }

  if (!volunteer.email) {
    return (
      <div className="check-in-volunteer">
        <p>
          You must sign a paper copy of the CK Volunteer Agreement. Please ask
          your volunteer manager for a copy of the agreement to sign.
        </p>
        <button
          onClick={() => navigate("../../list/" + shiftId)}
          className="cancel"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="check-in-volunteer">
      <p>
        Before you start, you'll need to sign the CK Kitchen Volunteer
        Agreement.
      </p>
      <Link to={`../CI/${contactId}/${shiftId}`}>
        <button>Sign the Agreement</button>
      </Link>
      <button
        onClick={() => navigate("../../list/" + shiftId)}
        className="cancel"
      >
        Start Over
      </button>
    </div>
  );
};

export default CheckInSign;
