import { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSubmitFormMutation } from '../../state/apis/formApi';
import Loading from '../reusable/loading/Loading';

const HomeChefRegistration = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const navigate = useNavigate();

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    submitForm({
      formData: {
        email,
        firstName,
        lastName,
        phone,
      },
      name: 'HOME_CHEF_REGISTRATION',
    })
      .unwrap()
      .then(() => {
        navigate('/forms/form-sent');
      });
  };

  const header = () => {
    return (
      <div className="form-item">
        <h1>In-Person Home Chef Training</h1>
        <strong>
          Sign up here for hands on training at the CK Kitchen, 2270 Telegraph
          Ave on July 27th, 12pm-3pm
        </strong>
        <br />
        <p>
          At the Home Chef in person training we will cook a large batch meal
          together for Town Fridges and discuss details of the program.
        </p>

        <br />
        <p>
          Questions? Contact Mollye Chudacoff,{' '}
          <a href="mailto:mollye@ckoakland.org">mollye@ckoakland.org</a>
        </p>
      </div>
    );
  };

  return (
    <>
      {header()}
      <form onSubmit={onSubmit}>
        <div className="form-item">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-item">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-item">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-item">
          <label>Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {isLoading ? <Loading /> : <input type="submit" value="Submit" />}
      </form>
    </>
  );
};

export default HomeChefRegistration;
