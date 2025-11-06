import { useState, FormEventHandler } from "react";

import Loading from "../../reusable/loading/Loading";
import "../Volunteers.css";
import EnterEmail from "./EnterEmail";
import EnterName from "./EnterName";
import {
  useLazyGetVolunteerQuery,
  useCreateVolunteerMutation,
} from "../../../state/apis/volunteerApi/volunteerApi";

const GetVolunteer = () => {
  const [email, setEmail] = useState("");
  const [showNameFields, setShowNameFields] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [getVolunteer, getVolunteerResult] = useLazyGetVolunteerQuery();
  const [createVolunteer, createVolunteerResult] = useCreateVolunteerMutation();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!showNameFields) {
      const volunteer = await getVolunteer(email).unwrap();
      if (!volunteer) {
        setShowNameFields(true);
      }
    } else {
      await createVolunteer({ email, firstName, lastName }).unwrap();
    }
  };

  const displayEmail = () => {
    return (
      <div className="volunteers-email-display volunteers-signin-field">
        <h4>Email:</h4>
        <p>{email}</p>
        <p
          className="retro-link text-small"
          onClick={() => setShowNameFields(false)}
        >
          Use a different email address
        </p>
      </div>
    );
  };

  return (
    <div className="volunteers-signin">
      <h3>Thanks for signing up to volunteer!</h3>
      <p>Please enter your information so you can sign up.</p>
      <form onSubmit={handleSubmit}>
        {showNameFields ? (
          <>
            {displayEmail()}
            <EnterName
              firstName={firstName}
              lastName={lastName}
              setFirstName={setFirstName}
              setLastName={setLastName}
            />
          </>
        ) : (
          <EnterEmail email={email} setEmail={setEmail} />
        )}
        {getVolunteerResult.isLoading || createVolunteerResult.isLoading ? (
          <Loading />
        ) : (
          <input type="submit" value="Submit" />
        )}
      </form>
    </div>
  );
};

export default GetVolunteer;
