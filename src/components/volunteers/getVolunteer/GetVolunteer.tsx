import { useState, FormEventHandler, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '../../reusable/loading/Loading';
import '../Volunteers.css';
import EnterEmail from './EnterEmail';
import EnterName from './EnterName';
import {
  useLazyGetVolunteerQuery,
  useCreateVolunteerMutation,
} from '../../../state/apis/volunteerApi';
import { useGetUserQuery } from '../../../state/apis/authApi';

const GetVolunteer = ({ returnLink }: { returnLink: string }) => {
  const { id } = useParams();

  const [email, setEmail] = useState('');
  const [showNameFields, setShowNameFields] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [getVolunteer, getVolunteerResult] = useLazyGetVolunteerQuery();
  const [createVolunteer, createVolunteerResult] = useCreateVolunteerMutation();
  const { data: user } = useGetUserQuery();

  const navigate = useNavigate();

  const url = returnLink || `../signup/${id}` || '';

  useEffect(() => {
    if (user) {
      navigate(url);
    }
  }, [user, navigate, url]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!showNameFields) {
      getVolunteer(email)
        .unwrap()
        .then((volunteer) => {
          if (!volunteer) {
            setShowNameFields(true);
          } else {
            navigate(url);
          }
        });
    } else {
      createVolunteer({ email, firstName, lastName })
        .unwrap()
        .then((vol) =>
          getVolunteer(vol.email)
            .unwrap()
            .then(() => {
              navigate(url);
            })
        );
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
      <h2>
        Thanks for signing up to volunteer! Please enter your information so you
        can sign up.
      </h2>
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
