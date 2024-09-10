import { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSubmitFormMutation } from '../../state/apis/formApi';
import Loading from '../reusable/loading/Loading';

const HomeChefRegistration = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('');

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
        source,
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
        <p className="form-home-chef-reg-sub-header">
          <strong>
            Sign up here for hands on training at the CK Kitchen, 2270 Telegraph
            Ave on Saturday, August 17th, 12pm-3pm
          </strong>
        </p>
        <br />
        <p>
          Thank you for your interest in becoming a CK Home Chef! Home Chefs
          donate home cooked, delicious meals to Town Fridges that are located
          in neighborhoods that experience high levels of food insecurity. Home
          Chef Volunteers cook 15-25 meals at home with family and friends,
          procure ingredients and deliver to Town Fridges on a regular schedule
          where anyone can take a meal for free 24/7. CK provides packaging,
          labels, local restaurant recipes, supplemental produce and a tax
          deductible annual In-Kind Gift Donation receipt.
        </p>
        <br />
        <p>
          Come get hands-on experience and learn best practices, tips & tricks
          for cooking for 25+ at our in person training at the CK Central
          Kitchen. We will be cooking a large batch meal together for Town
          Fridges with the assistance of active Home Chefs who will share their
          experiences and answer any questions.
        </p>
        <br />
        <p>
          Please wear comfortable shoes and bring a water bottle.
          <br />
          <br />
          Thank you for joining us and feel free to contact me with any
          questions:{' '}
          <a href="mailto:mollye@ckoakland.org">mollye@ckoakland.org</a>
          <br />
          <br />
          Looking forward to meeting you!
          <br />
          <br />
          Best,
          <br />
          Mollye Chudacoff
          <br />
          Meal & Volunteer Program Manager
          <br />
          Community Kitchens
          <br />
          <a href="https://ckoakland.org/volunteer">CKoakland.org/volunteer</a>
          <p className="required">* Indicates required question</p>
        </p>
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
          <label>How did you hear about the CK Home Chef program?</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>

        {isLoading ? <Loading /> : <input type="submit" value="Submit" />}
      </form>
    </>
  );
};

export default HomeChefRegistration;
