import { useState, FormEventHandler, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../../reusable/loading/Loading';
import '../Volunteers.css';
import EnterEmail from './EnterEmail';
import EnterName from './EnterName';
import {
  useLazyGetVolunteerQuery,
  useCreateVolunteerMutation,
} from '../../../state/apis/volunteerApi';
import { useGetUserQuery } from '../../../state/apis/authApi';

const GetVolunteer = () => {
  const [email, setEmail] = useState('');
  const [showNameFields, setShowNameFields] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [getVolunteer, getVolunteerResult] = useLazyGetVolunteerQuery();
  const [createVolunteer, createVolunteerResult] = useCreateVolunteerMutation();
  const { data: user } = useGetUserQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('../signup/list');
    }
  }, [user, navigate]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!showNameFields) {
      getVolunteer(email)
        .unwrap()
        .then((volunteer) => {
          if (!volunteer) {
            setShowNameFields(true);
          } else {
            navigate('../signup/list');
          }
        });
    } else {
      createVolunteer({ email, firstName, lastName })
        .unwrap()
        .then((vol) =>
          getVolunteer(vol.email)
            .unwrap()
            .then(() => {
              navigate('../signup/list');
            })
        );
    }
  };

  const displayEmail = () => {
    return (
      <div className="volunteers-email-display">
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
    <div>
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
