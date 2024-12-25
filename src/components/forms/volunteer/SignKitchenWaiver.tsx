import { FormEventHandler, useState } from 'react';

import { useGetKitchenSigningUrlMutation } from '../../../state/apis/signApi';
import Loading from '../../reusable/loading/Loading';

const SignKitchenWaiver = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [getUrl, { isLoading }] = useGetKitchenSigningUrlMutation();

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const { signingUrl } = await getUrl({
      email,
      firstName,
      lastName,
    }).unwrap();

    window.location.href = signingUrl;
  };

  const header = () => {
    return (
      <div className="form-item">
        <h1>CK Kitchen Volunteer Agreement</h1>
        <p>
          Please enter your information to sign the CK Kitchen Volunteer
          Agreement
        </p>
        <br />
        <p className="required">* Indicates required question</p>
      </div>
    );
  };

  return (
    <>
      {header()}
      <form onSubmit={onSubmit}>
        <div className="form-item">
          <label>
            First Name<span className="required">*</span>
          </label>
          <input
            required
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label>
            Last Name<span className="required">*</span>
          </label>
          <input
            required
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label>
            Email<span className="required">*</span>
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {isLoading ? <Loading /> : <input type="submit" value="Submit" />}
      </form>
    </>
  );
};

export default SignKitchenWaiver;
