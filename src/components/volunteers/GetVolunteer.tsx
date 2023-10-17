import { useState, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../reusable/loading/Loading';

import EnterEmail from './EnterEmail';
import EnterName from './EnterName';
import {
  useLazyGetVolunteerQuery,
  useCreateVolunteerMutation,
} from '../../state/apis/volunteerApi';

const GetVolunteer = () => {
  const [email, setEmail] = useState('');
  const [showNameFields, setShowNameFields] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [getVolunteer, getVolunteerResult] = useLazyGetVolunteerQuery();
  const [createVolunteer, createVolunteerResult] = useCreateVolunteerMutation();

  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!showNameFields) {
      getVolunteer(email)
        .unwrap()
        .then((volunteer) => {
          if (!volunteer) {
            setShowNameFields(true);
          } else {
            navigate('../signup/' + email);
          }
        });
    } else {
      createVolunteer({ email, firstName, lastName })
        .unwrap()
        .then(() => {
          navigate('../signup/' + email);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <EnterEmail email={email} setEmail={setEmail} />
        {showNameFields && (
          <EnterName
            firstName={firstName}
            lastName={lastName}
            setFirstName={setFirstName}
            setLastName={setLastName}
          />
        )}
        {getVolunteerResult.isLoading || createVolunteerResult.isLoading ? (
          <Loading />
        ) : (
          <input type="submit" />
        )}
      </form>
    </div>
  );
};

export default GetVolunteer;
