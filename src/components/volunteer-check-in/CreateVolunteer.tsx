import { FormEventHandler, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import emailIsValid from "../../utils/emailAddressIsValid";
import {
  useCreateVolunteerMutation,
  useLazyGetVolunteerQuery,
} from "../../state/apis/volunteerApi";
import { useCreateVolunteerHoursMutation } from "../../state/apis/volunteerApi/checkInApi";
import Loading from "../reusable/loading/Loading";
import { setError } from "../../state/apis/slices/errorSlice";
import { useGetSigningConfigQuery } from "../../state/apis/signApi";

const CreateVolunteer = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { shiftId } = useParams();

  const [createVolunteer, { isLoading: addVolIsLoading }] =
    useCreateVolunteerMutation();
  const [createVolunteerHours, { isLoading: hoursIsLoading }] =
    useCreateVolunteerHoursMutation();
  const [getVolunteer, { isLoading: getVolIsLoading }] =
    useLazyGetVolunteerQuery();

  const { data: signApiConfig } = useGetSigningConfigQuery(undefined, {
    pollingInterval: 60000,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = addVolIsLoading || hoursIsLoading || getVolIsLoading;

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!emailIsValid(email)) {
      return dispatch(setError("Email address is invalid"));
    }

    if (!shiftId) {
      return dispatch(setError("No shift ID in the URL. Please start over."));
    }

    let volunteer = await getVolunteer(email).unwrap();

    if (!volunteer) {
      volunteer = await createVolunteer({
        firstName,
        lastName,
        email,
      }).unwrap();
    }

    // create hours
    const hours = await createVolunteerHours({
      shiftId,
      contactId: volunteer.id,
    }).unwrap();

    if (signApiConfig?.limitReached) {
      navigate(`../confirm/${volunteer.id}/${shiftId}`);
    } else {
      navigate("../sign/pre/" + volunteer.id + "/" + shiftId);
    }
  };

  return (
    <form onSubmit={onSubmit} className="check-in-new-volunteer-form">
      <div>
        <label htmlFor="first-name">First Name</label>
        <input
          required
          id="first-name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="last-name">Last Name</label>
        <input
          id="last-name"
          required
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {isLoading ? <Loading /> : <input type="submit" value="Submit" />}
      <button className="cancel" onClick={() => navigate(-1)}>
        Back
      </button>
    </form>
  );
};

export default CreateVolunteer;
