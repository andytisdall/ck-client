import { Link, useParams, useNavigate } from "react-router-dom";

import {
  useGetVolunteersForCheckInQuery,
  useGetTodaysShiftsQuery,
} from "../../state/apis/volunteerApi/checkInApi";
import Loading from "../reusable/loading/Loading";

const CheckInVolunteers = () => {
  const { shiftId } = useParams();

  const { data: shifts } = useGetTodaysShiftsQuery();
  const shift = shifts?.find((sh) => sh.id === shiftId);

  const navigate = useNavigate();

  const { data: volunteers, isLoading } = useGetVolunteersForCheckInQuery(
    shiftId || ""
  );

  if (isLoading) {
    return <Loading />;
  }

  const renderConfirmedVolunteers = () => {
    if (!volunteers?.length) {
      return <h4>No volunteers are scheduled for today</h4>;
    }

    const confirmedVols = volunteers?.filter(
      ({ status }) => status === "Confirmed"
    );
    if (confirmedVols?.length === 0) {
      return <h4>All scheduled volunteers are checked in</h4>;
    }
    if (confirmedVols?.length) {
      return (
        <div>
          <h3>Not Checked In</h3>
          <div className="check-in-volunteer-list">
            {confirmedVols.map((vol) => {
              const url = vol.volunteerAgreement
                ? `../confirm/${vol.contactId}/${shiftId}`
                : `../sign/pre/${vol.contactId}/${shiftId}`;
              return (
                <Link
                  key={vol.hoursId}
                  to={url}
                  className="check-in-volunteer-item"
                >
                  <p>
                    {vol.firstName} {vol.lastName}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      );
    }
  };

  const renderCheckedInVolunteers = () => {
    const checkedInVols = volunteers?.filter(
      ({ status }) => status === "Completed"
    );
    if (checkedInVols?.length) {
      return (
        <div>
          <h3>Checked In</h3>
          {checkedInVols.map((vol) => {
            return (
              <ul key={vol.hoursId}>
                <li>
                  {vol.firstName} {vol.lastName}
                </li>
              </ul>
            );
          })}
        </div>
      );
    }
  };

  const renderNewVolunteerBtn = () => {
    return (
      <div className="check-in-volunteer-list">
        <Link to={"../create/" + shiftId}>
          <div className="check-in-volunteer-item check-in-new-volunteer-btn">
            <p>New Volunteer</p>
          </div>
        </Link>
      </div>
    );
  };

  const renderVolunteers = () => {
    if (!volunteers) {
      return <p>Error getting volunteer info.</p>;
    }
    return (
      <>
        {renderConfirmedVolunteers()}
        {renderNewVolunteerBtn()}
        {renderCheckedInVolunteers()}
      </>
    );
  };

  return (
    <div className="check-in-list">
      <div className="check-in-list-header">
        <button onClick={() => navigate("..")}>Back to Jobs</button>
        <h2>{shift?.job}</h2>
      </div>
      <div className="check-in-list-detail">{renderVolunteers()}</div>
    </div>
  );
};

export default CheckInVolunteers;
