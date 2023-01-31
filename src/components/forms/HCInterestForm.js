import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../reusable/Loading';
import { submitForm } from '../../actions';
import './Form.css';

const successMessage =
  'A Community Kitchens staff member will be in touch with you. Thanks for helping out!';

const InterestForm = ({ submitForm, alert, error }) => {
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    if (alert) {
      navigate('../form-sent');
    }
  }, [alert, navigate]);

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

    submitForm(
      {
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
        extraInfo,
      },
      { name: 'HOME_CHEF_INTEREST', successMessage }
    );
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
      <div className="form-item">
        <label>
          What day of the week are you available to deliver meals?
          <span className="required">*</span>
        </label>
        {days.map((d) => {
          return (
            <div className="form-checkbox" key={d}>
              <input
                type="checkbox"
                name="days"
                id={d}
                onChange={(e) => {
                  const { checked } = e.target;
                  setDaysAvailable({ ...daysAvailable, [d]: checked });

                  if (checked) {
                    setErrors({ ...errors, days: false });
                  }
                }}
              />
              <label htmlFor={d}>{d}</label>
            </div>
          );
        })}
        {errors.days && showError()}
      </div>
    );
  };

  const header = () => {
    return (
      <div className="form-item">
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
    <>
      {header()}
      <form onSubmit={onSubmit}>
        <div className="form-item">
          <label htmlFor="email">
            Email<span className="required">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="firstName">
            First Name<span className="required">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="lastName">
            Last Name<span className="required">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="phoneNumber">
            Phone Number<span className="required">*</span>
          </label>
          <input
            id="phoneNumber"
            type="tel"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="instagramHandle">Instagram Handle</label>
          <input
            id="instagramHandle"
            type="text"
            value={instagramHandle}
            onChange={(e) => setInstagramHandle(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label>
            Are you able to commit to cooking and delivering 25 meals 2-4 days
            per month?<span className="required">*</span>
          </label>
          <div className="form-checkbox">
            <input
              id="commit-yes"
              name="commit"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setCommit(true);
                  setErrors({ ...errors, commit: false });
                }
              }}
            />
            <label htmlFor="commit-yes">Yes</label>
          </div>

          <div className="form-checkbox">
            <input
              id="commit-no"
              name="commit"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setCommit(false);
                  setErrors({ ...errors, commit: false });
                }
              }}
            />
            <label htmlFor="commit-no">No</label>
          </div>
          {errors.commit && showError()}
        </div>

        <div className="form-item">
          <label>
            If you do not have a CA Food Handlers Card, are you able to complete
            the online Food Safety training and exam in order to participate in
            the Volunteer Program? (It is 90 minutes long, and CK can reimburse
            for the cost).<span className="required">*</span>
          </label>

          <div className="form-checkbox">
            <input
              id="foodHandler-yes"
              name="foodHandler"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setFoodHandler(true);
                  setErrors({ ...errors, foodHandler: false });
                }
              }}
            />
            <label htmlFor="foodHandler-yes">Yes</label>
          </div>

          <div className="form-checkbox">
            <input
              id="foodHandler-no"
              name="foodHandler"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setFoodHandler(false);
                  setErrors({ ...errors, foodHandler: false });
                }
              }}
            />
            <label htmlFor="foodHandler-no">No</label>
          </div>
          {errors.foodHandler && showError()}
        </div>

        {daysOfWeek()}

        <div className="form-item">
          <label>
            Do you have any cooking experience?
            <span className="required">*</span>
          </label>

          <div className="form-checkbox">
            <input
              type="radio"
              id="experience-rest"
              name="experience"
              onChange={(e) => {
                if (e.target.checked) {
                  setExperience('Restaurant');
                  setErrors({ ...errors, experience: false });
                }
              }}
            />
            <label htmlFor="experience-rest">Yes, at a Restaurant</label>
          </div>

          <div className="form-checkbox">
            <input
              type="radio"
              id="experience-home"
              name="experience"
              onChange={(e) => {
                if (e.target.checked) {
                  setExperience('Home');
                  setErrors({ ...errors, experience: false });
                }
              }}
            />
            <label htmlFor="experience-home">Yes, at Home</label>
          </div>

          <div className="form-checkbox">
            <input
              type="radio"
              id="experience-no"
              name="experience"
              onChange={(e) => {
                if (e.target.checked) {
                  setExperience('None');
                  setErrors({ ...errors, experience: false });
                }
              }}
            />
            <label htmlFor="experience-no">No</label>
          </div>
          {errors.experience && showError()}
        </div>

        <div className="form-item">
          <label>
            Are you able to attend a CK Home Chef Zoom info session or watch the
            recording?<span className="required">*</span>
          </label>
          <div className="form-checkbox">
            <input
              type="radio"
              id="attend-yes"
              name="attend"
              onChange={(e) => {
                if (e.target.checked) {
                  setAttend(true);
                  setErrors({ ...errors, attend: false });
                }
              }}
            />
            <label htmlFor="attend-yes">Yes</label>
          </div>

          <div className="form-checkbox">
            <input
              type="radio"
              id="attend"
              name="attend"
              onChange={(e) => {
                if (e.target.checked) {
                  setAttend(false);
                  setErrors({ ...errors, attend: false });
                }
              }}
            />
            <label htmlFor="attend-no">No</label>
          </div>
          {errors.attend && showError()}
        </div>

        <div className="form-item">
          <label>
            Are you interested in picking up meals from various events and
            delivering to Town Fridges on an as needed basis?
            <span className="required">*</span>
          </label>

          <div className="form-checkbox">
            <input
              id="pickup-yes"
              name="pickup"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setPickup(true);
                  setErrors({ ...errors, pickup: false });
                }
              }}
            />
            <label htmlFor="pickup-yes">Yes</label>
          </div>

          <div className="form-checkbox">
            <input
              id="pickup-no"
              name="pickup"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setPickup(false);
                  setErrors({ ...errors, pickup: false });
                }
              }}
            />
            <label htmlFor="pickup-no">No</label>
          </div>
          {errors.pickup && showError()}
        </div>

        <div className="form-item">
          <label htmlFor="source">
            How did you hear about Community Kitchens?
            <span className="required">*</span>
          </label>
          <input
            id="source"
            required
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          {errors.source && showError()}
        </div>

        <div className="form-item">
          <label htmlFor="extraInfo">
            Anything else you would like us to know?
          </label>
          <input
            id="extraInfo"
            type="text"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />
        </div>

        {!loading ? <input type="submit" /> : <Loading />}
        {!Object.values(errors).every((e) => !e) && (
          <div className="required-error">
            Please fix the errors in the form
          </div>
        )}
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return { alert: state.alert.message, error: state.error.error };
};

export default connect(mapStateToProps, { submitForm })(InterestForm);
