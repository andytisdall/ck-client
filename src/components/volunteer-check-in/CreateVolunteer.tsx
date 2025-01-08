import { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateVolunteerMutation } from '../../state/apis/volunteerApi';
import Loading from '../reusable/loading/Loading';

const CreateVolunteer = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [createVolunteer, { isLoading }] = useCreateVolunteerMutation();

  const navigate = useNavigate();

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const volunteer = await createVolunteer({
      firstName,
      lastName,
      email,
    }).unwrap();

    // create hours

    navigate('../sign/' + volunteer.id);
  };

  return (
    <form onSubmit={onSubmit} className="check-in-volunteer">
      <div>
        <label>First Name</label>
        <input
          required
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <label>Last Name</label>
        <input
          required
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {isLoading ? <Loading /> : <input type="submit" value="Submit" />}
    </form>
  );
};

export default CreateVolunteer;
