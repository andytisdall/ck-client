import { useSearchParams, useNavigate } from 'react-router-dom';
import { FormEventHandler, useState } from 'react';

import { useSubmitFormMutation } from '../../../state/apis/formApi';
import FormHeader from '../reusable/FormHeader';
import Loading from '../../reusable/loading/Loading';

const CAMPAIGN_ID = '701UP00000GWErVYAX';

const VolunteerAppreciation2024 = () => {
  const [params] = useSearchParams();
  const userEmail = params.get('email');
  // const campaignId = params.get('campaignId');

  const [email, setEmail] = useState(userEmail || '');
  const [attending, setAttending] = useState(true);
  const [guest, setGuest] = useState(false);

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const successMessage =
      'Thanks for RSVPing for the Volunteer Appreciation event!';

    await submitForm({
      formData: { attending, guest, campaignId: CAMPAIGN_ID, email },
      name: 'RSVP',
    }).unwrap();

    navigate('/forms/form-sent', { state: { message: successMessage } });
  };

  const headerText = (
    <p>
      Join us at the CK Kitchen to celebrate a year of generousity from our
      awesome volunteers!
    </p>
  );

  return (
    <>
      <FormHeader title="CK Volunteer Appreciation Party">
        {headerText}
      </FormHeader>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="email">
            Email: <span className="required">*</span>
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
            Will you attend the volunteer appreciation party on January 30th,
            2025? <span className="required">*</span>
          </label>
          <div className="form-checkbox">
            <input
              type="radio"
              name="attending"
              id="attending-yes"
              checked={true}
              onChange={(e) => {
                if (e.target.checked) {
                  setAttending(true);
                }
              }}
            />
            <label htmlFor="attending-yes">Yes</label>
          </div>
          <div className="form-checkbox">
            <input
              type="radio"
              name="attending"
              id="attending-no"
              onChange={(e) => {
                if (e.target.checked) {
                  setAttending(false);
                }
              }}
            />
            <label htmlFor="attending-no">No</label>
          </div>
        </div>

        <div className="form-item">
          <label>
            Will you be bringing a guest to the event?{' '}
            <span className="required">*</span>
          </label>
          <div className="form-checkbox">
            <input
              type="radio"
              name="guest"
              id="guest-yes"
              onChange={(e) => {
                if (e.target.checked) {
                  setGuest(true);
                }
              }}
            />
            <label htmlFor="guest-yes">Yes</label>
          </div>
          <div className="form-checkbox">
            <input
              type="radio"
              name="guest"
              checked={true}
              id="guest-no"
              onChange={(e) => {
                if (e.target.checked) {
                  setGuest(false);
                }
              }}
            />
            <label htmlFor="guest-no">No</label>
          </div>
        </div>

        {isLoading ? <Loading /> : <input type="submit" value="RSVP" />}
      </form>
    </>
  );
};

export default VolunteerAppreciation2024;
