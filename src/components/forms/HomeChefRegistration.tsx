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

        <br />
        <p>
          Thanks for signing up for the Home Chef Training at the CK Central
          Kitchen located at 2270 Telegraph Ave on TUESDAY, 10/29 from 5:30-7:30
          PM!
        </p>
        <br />
        <p>
          Join us as the amazing Melinda Drayton, a seasoned Home Chef, guides
          us in whipping up her beloved family recipe—Cowgirl Chili and Maple
          Butter Cornbread—to share with our community through Town Fridges.
        </p>
        <br />
        <p>
          This is your chance to roll up your sleeves and gain hands-on
          experience cooking for 25+ people. Bring your family and friends along
          to learn how to cook in large batches while having a blast together,
          sip on some wine and beer and enjoy the meal together!
        </p>
        <br />
        <p>
          As a Home Chef, you’ll be part of a heartwarming mission, donating
          home-cooked meals made with love to Town Fridges in neighborhoods
          facing food insecurity. Home Chef Volunteers cook 15-25 meals at home
          with family and friends, procure ingredients and deliver to Town
          Fridges where anyone can take a meal for free 24/7. CK provides
          packaging, labels, local restaurant recipes, supplemental produce and
          a tax deductible annual In-Kind Gift Donation receipt.
        </p>
        <br />
        <p>
          We can’t wait to see you there! If you have any questions, feel free
          to reach out at{' '}
          <a href="mailto:mollye@ckoakland.org">mollye@ckoakland.org.</a>
        </p>
        <br />
        <p>Let’s make a difference together—see you soon! 🌟</p>
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
