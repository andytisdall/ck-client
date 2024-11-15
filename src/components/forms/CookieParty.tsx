import { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSubmitFormMutation } from '../../state/apis/formApi';
import Loading from '../reusable/loading/Loading';
import FormHeader from './reusable/FormHeader';
import { useGetCampaignsQuery } from '../../state/apis/volunteerApi';

const COOKIE_PARTY_CAMPAIGN_ID = '701UP00000EYblBYAT';
const COOKIE_PARTY_SHIFT_ID = 'a0yUP000002pdHjYAI';

// sandbox
// const COOKIE_PARTY_CAMPAIGN_ID = '701U800000EaS90IAF';
// const COOKIE_PARTY_SHIFT_ID = 'a0yU8000000VKNRIA4';

const CookieParty = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [numberOfVolunteers, setNumberOfVolunteers] = useState(1);

  const { data: campaigns } = useGetCampaignsQuery();
  const campaign = campaigns?.find(
    (cam) => cam.id === COOKIE_PARTY_CAMPAIGN_ID
  );
  const shift = campaign?.shifts.find((sh) => sh.id === COOKIE_PARTY_SHIFT_ID);

  const remainingVolunteers = shift?.slots;

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
        numberOfVolunteers,
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

  const headerText = (
    <>
      <p>
        In December, Community Kitchens will serve holiday cookies along with
        free hot meals to those in our community who are struggling with hunger
        and homelessness this holiday season. Everyone deserves a sweet treat
        and you can help make this happen!
      </p>
      <br />
      <p>
        We invite you to help share the love by joining us for a holiday cookie
        decorating party where we’ll work together to decorate 1,500 festive and
        colorful bundles of holiday happiness. All ages are welcome, no
        experience necessary. We hope you’ll share this special moment with us!
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
    </>
  );

  const title = 'CK Holiday Decorating Party';

  if (remainingVolunteers === 0) {
    return (
      <div className="form-item">
        <p>
          Thanks for your interest in our holiday cookie decorating party!
          Unfortunately all volunteer spots have been taken for this event. Stay
          tuned for more volunteer opportunities!
        </p>
      </div>
    );
  }

  return (
    <>
      <FormHeader
        title={title}
        img={
          'https://storage.googleapis.com/coherent-vision-368820.appspot.com/gingerbread.jpg'
        }
      >
        {headerText}
      </FormHeader>
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
            max={30}
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
