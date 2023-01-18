import { connect } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { submitInterestForm } from '../../../actions';
import './InterestForm.css';

const InterestForm = ({ submitInterestForm }) => {
  const initialDays = {
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  };

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [commit, setCommit] = useState(null);
  const [foodHandler, setFoodHandler] = useState(null);
  const [daysAvailable, setDaysAvailable] = useState(initialDays);
  const [experience, setExperience] = useState(null);
  const [attend, setAttend] = useState(null);
  const [pickup, setPickup] = useState(null);
  const [source, setSource] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (Object.values(daysAvailable).every((d) => !d)) {
      newErrors.days = true;
    }

    if (commit === null) {
      newErrors.commit = true;
    }

    if (foodHandler === null) {
      newErrors.foodHandler = true;
    }

    if (experience === null) {
      newErrors.experience = true;
    }

    if (attend === null) {
      newErrors.attend = true;
    }

    if (pickup === null) {
      newErrors.pick = true;
    }

    if (!Object.values(newErrors).every((e) => !e)) {
      setErrors({ ...errors, ...newErrors });
      return;
    }

    submitInterestForm(
      email,
      firstName,
      lastName,
      phoneNumber,
      instagramHandle,
      commit,
      foodHandler,
      daysAvailable,
      experience,
      attend,
      pickup,
      source,
      extraInfo
    );

    navigate('../form-sent');
  };

  const showError = () => {
    return <div className="required-error">This field must be completed</div>;
  };

  const daysOfWeek = () => {
    const days = [
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    return (
      <div className="interest-form-item">
        <label>
          What day of the week are you available to deliver meals?
          <span className="required">*</span>
        </label>
        {days.map((d) => {
          return (
            <div className="interest-form-checkbox" key={d}>
              <input
                type="checkbox"
                name={d}
                onChange={(e) => {
                  const { checked } = e.target;
                  setDaysAvailable({ ...daysAvailable, [d]: checked });

                  if (checked) {
                    setErrors({ ...errors, days: false });
                  }
                }}
              />
              <div>{d}</div>
            </div>
          );
        })}
        {errors.days && showError()}
      </div>
    );
  };

  const headerImage = () => {
    return (
      <img
        src="images/ck-header.png"
        alt="ckname"
        className="interest-form-item interest-form-image"
      />
    );
  };

  const header = () => {
    return (
      <div className="interest-form-item">
        <h1>CK Home Chef Meals for Town Fridges</h1>
        <p>
          Thank you so much for your interest in becoming a CK Home Chef! This
          volunteer opportunity will allow thousands of meals to get out into
          our community through existing Oakland Town Fridges. Town Fridges are
          a grassroots effort and are entirely community run and highly utilized
          in food insecure neighborhoods. Community Kitchens strives to ensure
          that refrigerators are regularly stocked with wholesome, delicious
          meals for anyone that needs it. Over 4,000 meals have been donated to
          Town Fridges since July!
        </p>

        <div className="bold">CK Home Chef participants:</div>
        <ul>
          <li>Attend orientation and food safety certification training</li>
          <li>Sign up for a couple shifts a month to provide 25 meals</li>
          <li>Purchase ingredients and prepare meals at home</li>
          <li>Deliver meals to selected Town Fridge</li>
        </ul>

        <div className="bold">Community Kitchens:</div>
        <ul>
          <li>Conduct zoom orientation and training</li>
          <li>Reimbursement for CA Food Handlers Card</li>
          <li>Provide meal containers and printable labels</li>
          <li>Share recipes from Oakland’s treasured restaurants and chefs</li>
          <li>Provide Tax deductible in-kind donation receipt</li>
        </ul>
        <p>
          Please take a moment to tell us about yourself and your availability.
          Thank you!
        </p>
      </div>
    );
  };

  return (
    <div className="interest-form-background">
      <div className="interest-form">
        {headerImage()}
        {header()}
        <form onSubmit={onSubmit} className="interest-form">
          <div className="interest-form-item">
            <label htmlFor="email">
              Email<span className="required">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="interest-form-item">
            <label htmlFor="firstName">
              First Name<span className="required">*</span>
            </label>
            <input
              name="firstName"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="interest-form-item">
            <label htmlFor="lastName">
              Last Name<span className="required">*</span>
            </label>
            <input
              name="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="interest-form-item">
            <label htmlFor="phoneNumber">
              Phone Number<span className="required">*</span>
            </label>
            <input
              name="phoneNumber"
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="interest-form-item">
            <label htmlFor="instagramHandle">Instagram Handle</label>
            <input
              name="instagramHandle"
              type="text"
              value={instagramHandle}
              onChange={(e) => setInstagramHandle(e.target.value)}
            />
          </div>

          <div className="interest-form-item">
            <label htmlFor="commit">
              Are you able to commit to cooking and delivering 25 meals two-four
              days per month?<span className="required">*</span>
            </label>
            <div className="interest-form-checkbox">
              <input
                name="commit"
                type="radio"
                onChange={(e) => {
                  setCommit(true);
                  if (e.target.checked) {
                    setErrors({ ...errors, commit: false });
                  }
                }}
              />
              <div>Yes</div>
            </div>

            <div className="interest-form-checkbox">
              <input
                name="commit"
                type="radio"
                onChange={(e) => {
                  setCommit(true);
                  if (e.target.checked) {
                    setErrors({ ...errors, commit: false });
                  }
                }}
              />
              <div>No</div>
            </div>
            {errors.commit && showError()}
          </div>

          <div className="interest-form-item">
            <label htmlFor="foodHandler">
              If you do not have a CA Food Handlers Card, are you able to
              complete the online Food Safety training and exam in order to
              participate in the Volunteer Program? (It is 90 minutes long, and
              CK can reimburse for the cost).<span className="required">*</span>
            </label>

            <div className="interest-form-checkbox">
              <input
                name="foodHandler"
                type="radio"
                onChange={(e) => {
                  setFoodHandler(true);
                  if (e.target.checked) {
                    setErrors({ ...errors, foodHandler: false });
                  }
                }}
              />
              <div>Yes</div>
            </div>

            <div className="interest-form-checkbox">
              <input
                name="foodHandler"
                type="radio"
                onChange={(e) => {
                  setFoodHandler(false);
                  if (e.target.checked) {
                    setErrors({ ...errors, foodHandler: false });
                  }
                }}
              />
              <div>No</div>
            </div>
            {errors.foodHandler && showError()}
          </div>

          {daysOfWeek()}

          <div className="interest-form-item">
            <label htmlFor="experience">
              Do you have any cooking experience?
              <span className="required">*</span>
            </label>

            <div className="interest-form-checkbox">
              <input
                type="radio"
                name="experience"
                onChange={(e) => setExperience('Yes')}
              />
              <div>Yes, at a Restaurant</div>
            </div>

            <div className="interest-form-checkbox">
              <input
                type="radio"
                name="experience"
                onChange={(e) => {
                  setExperience('No');
                  if (e.target.checked) {
                    setErrors({ ...errors, experience: false });
                  }
                }}
              />
              <div>Yes, at Home</div>
            </div>

            <div className="interest-form-checkbox">
              <input
                type="radio"
                name="experience"
                onChange={(e) => {
                  setExperience('Maybe');
                  if (e.target.checked) {
                    setErrors({ ...errors, experience: false });
                  }
                }}
              />
              <div>No</div>
            </div>
            {errors.experience && showError()}
          </div>

          <div className="interest-form-item">
            <label htmlFor="attend">
              Are you able to attend a CK Home Chef Zoom info session or watch
              the recording?<span className="required">*</span>
            </label>
            <div className="interest-form-checkbox">
              <input
                type="radio"
                name="attend"
                onChange={(e) => {
                  setAttend(true);
                  if (e.target.checked) {
                    setErrors({ ...errors, attend: false });
                  }
                }}
              />
              <div>Yes</div>
            </div>

            <div className="interest-form-checkbox">
              <input
                type="radio"
                name="attend"
                onChange={(e) => {
                  setAttend(false);
                  if (e.target.checked) {
                    setErrors({ ...errors, attend: false });
                  }
                }}
              />
              <div>No</div>
            </div>
            {errors.attend && showError()}
          </div>

          <div className="interest-form-item">
            <label htmlFor="pickup">
              Are you interested in picking up meals from various events and
              delivering to Town Fridges on an as needed basis?
              <span className="required">*</span>
            </label>

            <div className="interest-form-checkbox">
              <input
                name="pickup"
                type="radio"
                onChange={(e) => {
                  setPickup(true);
                  if (e.target.checked) {
                    setErrors({ ...errors, pickup: false });
                  }
                }}
              />
              <div>Yes</div>
            </div>

            <div className="interest-form-checkbox">
              <input
                name="pickup"
                type="radio"
                onChange={(e) => {
                  setPickup(false);
                  if (e.target.checked) {
                    setErrors({ ...errors, pickup: false });
                  }
                }}
              />
              <div>No</div>
            </div>
            {errors.pickup && showError()}
          </div>

          <div className="interest-form-item">
            <label htmlFor="source">
              How did you hear about Community Kitchens?
              <span className="required">*</span>
            </label>
            <input
              name="source"
              required
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            {errors.source && showError()}
          </div>

          <div className="interest-form-item">
            <label htmlFor="extraInfo">
              Anything else you would like us to know?
            </label>
            <input
              name="extraInfo"
              type="text"
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
          </div>

          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { submitInterestForm })(InterestForm);
