import { useState, FormEventHandler, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Loading from '../reusable/loading/Loading';
import { useSubmitFormMutation } from '../../state/apis/formApi';
import { setAlert } from '../../state/apis/slices/alertSlice';

const successMessage =
  'A Community Kitchens staff member will be in touch with you. Thanks for helping out!';

const InterestForm = () => {
  const initialPrograms = {
    ckKitchen: false,
    ckHomeChefs: false,
    corporate: false,
    other: '',
  };

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');

  const [programs, setPrograms] = useState(initialPrograms);
  const [otherProgram, setOtherProgram] = useState('');

  const [workOnFeet, setWorkOnFeet] = useState<boolean>();
  const [workOnFeetOther, setWorkOnFeetOther] = useState('');

  const [transport, setTransport] = useState<boolean>();
  const [transportOther, setTransportOther] = useState('');

  const [experience, setExperience] = useState('');
  const [otherExperience, setOtherExperience] = useState('');

  const [foodHandler, setFoodHandler] = useState<boolean>();
  const [foodHandlerOther, setFoodHandlerOther] = useState('');

  const [source, setSource] = useState('');
  const [extraInfo, setExtraInfo] = useState('');

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [submitForm, { isLoading }] = useSubmitFormMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const otherProgramRef = useRef<HTMLInputElement | null>(null);
  const otherExperienceRef = useRef<HTMLInputElement | null>(null);
  const otherWorkOnFeetRef = useRef<HTMLInputElement | null>(null);
  const otherTransportRef = useRef<HTMLInputElement | null>(null);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const newErrors: Record<string, boolean> = {};

    if (Object.values(programs).every((pr) => !pr)) {
      newErrors.programs = true;
    }

    if (!transport && !transportOther) {
      newErrors.transport = true;
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
        experience,
        source,
        extraInfo,
        foodHandlerOther,
        programs,
        workOnFeet,
        workOnFeetOther,
        transport,
        transportOther,
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

  const header = () => {
    return (
      <div className="form-item">
        <h1>CK Cooking Volunteer Opportunities</h1>
        <p>
          <strong>
            Thank you for your interest in volunteering with Community Kitchens.
            Please take a moment to tell us about yourself and which program(s)
            you're interested in volunteering for:
          </strong>
        </p>

        <ol>
          <li>
            <strong>CK Central Kitchen</strong> volunteers work in teams to help
            prepare and package meals for special events, youth programs and
            curbside communities. Shifts are 2-3 hours long with convenient
            slots throughout the week. The CK Central Kitchen is located at 2270
            Telegraph in Oakland.
          </li>
          <br />
          <li>
            <strong>CK Home Chef</strong> volunteers work with friends andfamily
            to prepare meals in their own homes. Home Chefs help stock Town
            Fridge pantries throughout Oakland with free and nutritious
            home-cooked meals.
          </li>
        </ol>

        <p>
          <strong>
            Questions? Contact Mollye Chudacoff,{' '}
            <a href="mailto:mollye@ckoakland.org">mollye@ckoakland.org</a>
          </strong>
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
            Which programs are you interested in volunteering for?
            <span className="required">*</span>
          </label>

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
            <label htmlFor="home-chef">
              CK Home Chef - complete training, make meals at home and deliver
              to Town Fridges
            </label>
          </div>

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
            <label htmlFor="kitchen">
              CK Kitchen - help out at the CK Kitchen
            </label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              name="programs"
              id="kitchen"
              onChange={(e) => {
                const { checked } = e.target;
                setPrograms({ ...programs, corporate: checked });
                if (checked) {
                  setErrors({ ...errors, programs: false });
                }
              }}
            />
            <label htmlFor="kitchen">
              Community or corporate volunteer groups
            </label>
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
          <label>
            Are you able to work on your feet for a 2-3 hour cooking shift?
          </label>

          <div className="form-checkbox">
            <input
              type="radio"
              id="feet-true"
              name="feet"
              onChange={(e) => {
                if (e.target.checked) {
                  setWorkOnFeet(true);
                }
              }}
            />
            <label htmlFor="feet-true">Yes</label>
          </div>

          <div className="form-checkbox">
            <input
              type="radio"
              id="feet-no"
              name="feet"
              onChange={(e) => {
                if (e.target.checked) {
                  setWorkOnFeet(false);
                }
              }}
            />
            <label htmlFor="feet-no">No</label>
          </div>
          <div className="form-checkbox">
            <input
              type="radio"
              id="feet-other"
              ref={otherWorkOnFeetRef}
              name="feet"
              onChange={(e) => {
                if (e.target.checked) {
                  setWorkOnFeet(undefined);
                }
              }}
            />
            <label htmlFor="feet-other">Other:</label>
            <input
              type="text"
              value={workOnFeetOther}
              onChange={(e) => {
                setWorkOnFeetOther(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="form-item">
          <label>
            Are you able to cook and transport 15-25 meals at a time to help
            stock Town Fridges?<span className="required">*</span>
          </label>

          <div className="form-checkbox">
            <input
              type="radio"
              id="transport-true"
              name="transport"
              onChange={(e) => {
                if (e.target.checked) {
                  setTransport(true);
                }
              }}
            />
            <label htmlFor="transport-true">Yes</label>
          </div>

          <div className="form-checkbox">
            <input
              type="radio"
              id="transport-no"
              name="transport"
              onChange={(e) => {
                if (e.target.checked) {
                  setTransport(false);
                }
              }}
            />
            <label htmlFor="transport-no">No</label>
          </div>
          <div className="form-checkbox">
            <input
              type="radio"
              id="transport-other"
              ref={otherTransportRef}
              name="transport"
              onChange={(e) => {
                if (e.target.checked) {
                  setTransport(undefined);
                }
              }}
            />
            <label htmlFor="transport-other">Other:</label>
            <input
              type="text"
              value={transportOther}
              onChange={(e) => {
                setTransportOther(e.target.value);
              }}
            />
          </div>

          {errors.transport && showError()}
        </div>

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
          </label>
          <input
            id="source"
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
