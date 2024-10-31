import { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSubmitFormMutation } from '../../state/apis/formApi';
import Loading from '../reusable/loading/Loading';

const CookieParty = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [numberOfVolunteers, setNumberOfVolunteers] = useState(1);

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
      name: 'COOKIE_PARTY',
    })
      .unwrap()
      .then(() => {
        navigate('/forms/form-sent', {
          state: {
            message:
              'Thank you for signing up for the holiday cookie party! You will receive a confirmation email.',
          },
        });
      });
  };

  const header = () => {
    return (
      <div className="form-item">
        <div className="form-center">
          <img
            src="https://storage.googleapis.com/coherent-vision-368820.appspot.com/gingerbread.jpg"
            alt="Holiday Cookies"
            className="form-img"
          />
          <h1>CK Holiday Cookie Decorating Party</h1>
        </div>
        <p>
          In December, Community Kitchens will serve holiday cookies along with
          free hot meals to those in our community who are struggling with
          hunger and homelessness this holiday season. Everyone deserves a sweet
          treat and you can help make this happen!
        </p>
        <br />
        <p>
          We invite you to help share the love by joining us for a holiday
          cookie decorating party where we’ll work together to decorate 1,500
          festive and colorful bundles of holiday happiness. All ages are
          welcome, no experience necessary. We hope you’ll share this special
          moment with us!
        </p>
        <br />
        <p className="form-center-text">
          <strong>Event Details</strong>
          <br />
          Saturday, December 14th
          <br />
          9-11am
          <br />
          The CK Central Kitchen at 2270 Telegraph in Oakland
        </p>
        <br />
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
            Email<span className="required">*</span>
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
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
          <label>Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label>
            Number of Volunteers<span className="required">*</span>
          </label>
          <input
            type="number"
            value={numberOfVolunteers}
            min={1}
            required
            onChange={(e) => setNumberOfVolunteers(parseInt(e.target.value))}
          />
          <p>
            If you're with a group, please indicate the number of people in your
            group.
          </p>
        </div>

        {isLoading ? <Loading /> : <input type="submit" value="Submit" />}
      </form>
    </>
  );
};

export default CookieParty;
