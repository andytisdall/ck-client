import { useState, FormEventHandler, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Loading from '../reusable/loading/Loading';
import { useSubmitFormMutation } from '../../state/apis/formApi';
import { setAlert } from '../../state/apis/slices/alertSlice';

const successMessage =
  'A Community Kitchens staff member will be in touch with you. Thanks for helping out!';

const InterestForm = () => {
  const initialDays = {
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  };

  const initialPrograms = {
    ckKitchen: false,
    ckHomeChefs: false,
    other: '',
  };

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [programs, setPrograms] = useState(initialPrograms);
  const [otherProgram, setOtherProgram] = useState('');

  const [instagramHandle, setInstagramHandle] = useState('');

  const [foodHandler, setFoodHandler] = useState<boolean>();
  const [foodHandlerOther, setFoodHandlerOther] = useState('');

  const [daysAvailable, setDaysAvailable] = useState(initialDays);

  const [experience, setExperience] = useState('');
  const [otherExperience, setOtherExperience] = useState('');

  const [pickup, setPickup] = useState<boolean>();
  const [pickupMaybe, setPickupMaybe] = useState(false);
  const [source, setSource] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [submitForm, { isLoading }] = useSubmitFormMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const otherProgramRef = useRef<HTMLInputElement | null>(null);
  const otherExperienceRef = useRef<HTMLInputElement | null>(null);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const newErrors: Record<string, boolean> = {};

    if (Object.values(programs).every((pr) => !pr)) {
      newErrors.programs = true;
    }

    if (!Object.values(newErrors).every((e) => !e)) {
      setErrors({ ...errors, ...newErrors });
      return;
    }

    submitForm({
      formData: {
        email,
        firstName,
        lastName,
        phoneNumber,
        instagramHandle,
        foodHandler,
        daysAvailable,
        experience,
        pickup,
        source,
        extraInfo,
        pickupMaybe,
        foodHandlerOther,
        otherExperience,
        programs,
      },
      name: 'VOLUNTEER_INTEREST',
    })
      .unwrap()
      .then(() => {
        dispatch(setAlert(successMessage));
        navigate('/forms/form-sent');
      });
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
        <label>What is your availability?</label>
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
        <h1>CK Cooking Volunteer Opportunities</h1>
        <p>
          Thank you so much for your interest in volunteering with Community
          Kitchens! We currently have{' '}
          <strong>
            two cooking volunteer opportunities: helping out at the CK Kitchen,
            and the CK Home Chef Program.
          </strong>
        </p>

        <ol>
          <li>
            <strong>CK Kitchen</strong> volunteers assist Chef Kendall on
            Tuesdays with meal prep and/or Wednesdays making wraps and
            sandwiches. All shifts are 2-5pm at the CK Kitchen, located at 2270
            Telegraph Ave. Meals are later delivered to encampments by the CK
            Mobile Oasis.
          </li>
          <br />
          <li>
            <strong>
              The CK Home Chef Program is a way to turn your home kitchen into a
              community kitchen and is great for groups of people to cook
              together on their own schedule. Home Chefs attend orientation and
              food safety certification training, sign up to prepare 15-25 meals
              1-2 times per month, purchase ingredients, prepare meals at home,
              and deliver meals to selected Town Fridges.
            </strong>{' '}
            Community Kitchens will conduct zoom orientation and training,
            reimburse chefs for a CA Food Handlers Card, provide meal
            containers, printable labels and supplemental produce, share recipes
            from Oakland’s treasured restaurants and chefs, and provide an
            annual tax deductible in-kind donation receipt.
          </li>
        </ol>

        <p>
          Please take a moment to tell us about yourself and which programs
          you're interested in volunteering for.
        </p>
        <br />
        <p>
          With Gratitude,
          <br />
          Community Kitchens
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
          <label>Which programs are you interested in volunteering for?</label>

          <div className="form-checkbox">
            <input
              type="checkbox"
              name="programs"
              id="kitchen"
              onChange={(e) => {
                const { checked } = e.target;
                setPrograms({ ...programs, ckKitchen: checked });
                if (checked) {
                  setErrors({ ...errors, programs: false });
                }
              }}
            />
            <label htmlFor="kitchen">CK Kitchen</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              name="programs"
              id="home-chef"
              onChange={(e) => {
                const { checked } = e.target;
                setPrograms({ ...programs, ckHomeChefs: checked });
                if (checked) {
                  setErrors({ ...errors, programs: false });
                }
              }}
            />
            <label htmlFor="home-chef">CK Home Chefs</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              name="programs"
              id="other"
              ref={otherProgramRef}
              onChange={(e) => {
                const { checked } = e.target;
                if (checked) {
                  setPrograms({ ...programs, other: otherProgram });
                  setErrors({ ...errors, programs: false });
                } else {
                  setPrograms({ ...programs, other: '' });
                }
              }}
            />
            <label htmlFor="other">Other:</label>
            <input
              type="text"
              value={otherProgram}
              onChange={(e) => {
                setOtherProgram(e.target.value);
                if (otherProgramRef.current?.checked) {
                  setPrograms({ ...programs, other: e.target.value });
                }
              }}
            />
          </div>

          {errors.programs && showError()}
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

        {daysOfWeek()}

        <div className="form-item">
          <label>Do you have any cooking experience?</label>

          <div className="form-checkbox">
            <input
              type="radio"
              id="experience-rest"
              name="experience"
              onChange={(e) => {
                if (e.target.checked) {
                  setExperience('Restaurant');
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
                }
              }}
            />
            <label htmlFor="experience-no">
              No, but I would like to learn!
            </label>
          </div>
          <div className="form-checkbox">
            <input
              type="radio"
              id="experience-other"
              ref={otherExperienceRef}
              name="experience"
              onChange={(e) => {
                if (e.target.checked) {
                  setExperience(otherExperience);
                }
              }}
            />
            <label htmlFor="experience-other">Other:</label>
            <input
              type="text"
              value={otherExperience}
              onChange={(e) => {
                setOtherExperience(e.target.value);
                if (otherExperienceRef.current?.checked) {
                  setExperience(e.target.value);
                }
              }}
            />
          </div>
        </div>

        <div className="form-item">
          <label>
            Are you interested in picking up meals from various events and
            delivering to Town Fridges on an as needed basis?
          </label>

          <div className="form-checkbox">
            <input
              id="pickup-yes"
              name="pickup"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setPickup(true);
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
                }
              }}
            />
            <label htmlFor="pickup-no">No</label>
          </div>

          <div className="form-checkbox">
            <input
              id="pickup-maybe"
              name="pickup"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setPickup(false);
                  setPickupMaybe(true);
                }
              }}
            />
            <label htmlFor="pickup-maybe">Maybe</label>
          </div>
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
              id="foodHandler-yes"
              name="foodHandler"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setFoodHandler(true);
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
                }
              }}
            />
            <label htmlFor="foodHandler-no">No</label>
          </div>

          <div className="form-checkbox">
            <input
              id="foodHandler-other"
              name="foodHandler"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setFoodHandler(false);
                }
              }}
            />
            <label htmlFor="foodHandler-other">Other:</label>
            <input
              type="text"
              value={foodHandlerOther}
              onChange={(e) => setFoodHandlerOther(e.target.value)}
            />
          </div>
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

        {!isLoading ? <input type="submit" value="Submit" /> : <Loading />}
        {!Object.values(errors).every((e) => !e) && (
          <div className="required-error">
            Please fix the errors in the form
          </div>
        )}
      </form>
    </>
  );
};

export default InterestForm;
