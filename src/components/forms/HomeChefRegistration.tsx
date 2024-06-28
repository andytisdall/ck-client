import { useState } from 'react';

import { useSubmitFormMutation } from '../../state/apis/formApi';
import Loading from '../reusable/loading/Loading';

const HomeChefRegistration = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [insta, setInsta] = useState('');
  const [foodHandler, setFoodHandler] = useState<boolean>();
  const [foodHandlerOther, setFoodHandlerOther] = useState('');
  const [source, setSource] = useState('');
  const [extraInfo, setExtraInfo] = useState('');

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const onSubmit = () => {
    submitForm({
      formData: {
        email,
        firstName,
        lastName,
        phone,
        instagramHandle: insta,
        foodHandler,
        foodHandlerOther,
        source,
        extraInfo,
      },
      name: 'HOME_CHEF_REGISTRATION',
    });
  };

  const header = () => {
    return (
      <div className="form-item">
        <h1>In Person Home Chef Training Registration</h1>
        <p>
          Thank you for your interest in becoming a CK Home Chef Volunteer. CK
          Home Chef Home Chef volunteers work with friends and family to prepare
          meals in their own homes and deliver meals to town fridges. Town
          Fridges are a grassroots effort that are community-run in
          neighborhoods that experience high levels of food insecurity and offer
          free food to the public 24/7.
        </p>
        <br />
        <p>
          <strong>
            Trainings are held monthly at the CK Central Kitchen at 2270
            Telegraph Ave.
          </strong>
        </p>
        <br />
        <p>
          <strong>
            Please register to attend one of the trainings on Saturday, July
            27th or August 31st, 12:00 - 3:00pm
          </strong>
        </p>
        <br />
        <p>
          <strong>
            At the Home Chef in person training we will cook a large batch meal
            together for Town Fridges and discuss details of the program.
          </strong>
        </p>
        <br />
        <p>
          Questions? Contact Mollye Chudacoff,{' '}
          <a href="mailto:mollye@ckoakland.org">mollye@ckoakland.org</a>
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
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="form-item">
          <label>
            Last Name<span className="required">*</span>
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="form-item">
          <label>
            Phone Number<span className="required">*</span>
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-item">
          <label>Instagram Handle</label>
          <input
            type="text"
            value={insta}
            onChange={(e) => setInsta(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label>
            If you do not have a CA Food Handlers Card, are you able to complete
            the online Food Safety training and exam in order to participate in
            the Volunteer Program? (It is 90 minutes long, and CK can reimburse
            for the cost).
          </label>
          <div className="form-checkbox">
            <input
              name="food-handler"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setFoodHandler(true);
                }
              }}
            />
            <label>Yes</label>
          </div>
          <div className="form-checkbox">
            <input
              name="food-handler"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setFoodHandler(false);
                }
              }}
            />
            <label>No</label>
          </div>
          <div className="form-checkbox">
            <input
              name="food-handler"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setFoodHandler(false);
                }
              }}
            />
            <label>Other:</label>
            <input
              type="text"
              value={foodHandlerOther}
              onChange={(e) => setFoodHandlerOther(e.target.value)}
            />
          </div>
        </div>

        <div className="form-item">
          <label>How did you hear about Community Kitchens?</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label>Anything else you would like us to know?</label>
          <input
            type="text"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />
        </div>

        {isLoading ? <Loading /> : <input type="submit" value="Submit" />}
      </form>
    </>
  );
};

export default HomeChefRegistration;
