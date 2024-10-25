import { useState, useRef, FormEventHandler } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useSubmitFormMutation } from '../../state/apis/formApi';
import Loading from '../reusable/loading/Loading';

const successMessage =
  'Thank you for you giving us some information about yourself.';

const TextSignupSurvey = () => {
  const [age, setAge] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [zip, setZip] = useState('');
  const [mixedRace, setMixedRace] = useState('');
  const [otherEth, setOtherEth] = useState('');
  const [type, setType] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [days, setDays] = useState('');

  const mixedRefBox = useRef<HTMLInputElement | null>(null);
  const mixedRefText = useRef<HTMLInputElement | null>(null);
  const otherRefBox = useRef<HTMLInputElement | null>(null);
  const otherRefText = useRef<HTMLInputElement | null>(null);

  const { phone } = useParams();
  const navigate = useNavigate();

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    submitForm({
      formData: {
        age,
        ethnicity,
        zip,
        type,
        ingredients,
        days,
        phone,
      },
      name: 'TEXT_SIGNUP_SURVEY',
    })
      .unwrap()
      .then(() => {
        navigate('/forms/form-sent', { state: { message: successMessage } });
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-item">
        <h1>Community Kitchens Survey</h1>
      </div>
      <div className="form-item">
        <label>What is your age?</label>
        <div className="form-checkbox">
          <input
            id="age-1"
            name="age"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setAge('0-17');
              }
            }}
          />
          <label htmlFor="age-1">0 - 17</label>
        </div>
        <div className="form-checkbox">
          <input
            id="age-2"
            name="age"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setAge('18-26');
              }
            }}
          />
          <label htmlFor="age-2">18 - 26</label>
        </div>
        <div className="form-checkbox">
          <input
            id="age-3"
            name="age"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setAge('27-50');
              }
            }}
          />
          <label htmlFor="age-3">27 - 50</label>
        </div>
        <div className="form-checkbox">
          <input
            id="age-4"
            name="age"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setAge('50-60');
              }
            }}
          />
          <label htmlFor="age-4">50 - 60</label>
        </div>
        <div className="form-checkbox">
          <input
            id="age-5"
            name="age"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setAge('60+');
              }
            }}
          />
          <label htmlFor="age-5">60+</label>
        </div>
      </div>

      <div className="form-item">
        <label>What is your ethnicity?</label>
        <div className="form-checkbox">
          <input
            id="ethnicity-1"
            name="ethnicity"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setEthnicity('African American/Black');
              }
            }}
          />
          <label htmlFor="ethnicity-1">African American / Black</label>
        </div>
        <div className="form-checkbox">
          <input
            id="ethnicity-2"
            name="ethnicity"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setEthnicity('Asian/Pacific Islander');
              }
            }}
          />
          <label htmlFor="ethnicity-2">Asian / Pacific Islander</label>
        </div>
        <div className="form-checkbox">
          <input
            id="ethnicity-3"
            name="ethnicity"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setEthnicity('Latina/Latino');
              }
            }}
          />
          <label htmlFor="ethnicity-3">Latina / Latino</label>
        </div>
        <div className="form-checkbox">
          <input
            id="ethnicity-4"
            name="ethnicity"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setEthnicity('Native American/American Indian');
              }
            }}
          />
          <label htmlFor="ethnicity-4">Native American / American Indian</label>
        </div>
        <div className="form-checkbox">
          <input
            id="ethnicity-5"
            name="ethnicity"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setEthnicity('White/Caucasian');
              }
            }}
          />
          <label htmlFor="ethnicity-5">White / Caucasian</label>
        </div>
        <div className="form-checkbox">
          <input
            id="ethnicity-6"
            name="ethnicity"
            type="radio"
            ref={mixedRefBox}
            onChange={(e) => {
              if (e.target.checked && mixedRefText.current) {
                mixedRefText.current.focus();
                setEthnicity(mixedRace);
              }
            }}
          />
          <label htmlFor="ethnicity-6">Mixed Race:</label>
          <input
            type="text"
            ref={mixedRefText}
            value={mixedRace}
            onFocus={() => {
              if (mixedRefBox.current) {
                mixedRefBox.current.checked = true;
              }
            }}
            onChange={(e) => {
              setMixedRace(e.target.value);
              setEthnicity(e.target.value);
            }}
          />
        </div>

        <div className="form-checkbox">
          <input
            id="ethnicity-7"
            name="ethnicity"
            type="radio"
            ref={otherRefBox}
            onChange={(e) => {
              if (e.target.checked && otherRefText.current) {
                otherRefText.current.focus();
                setEthnicity(otherEth);
              }
            }}
          />
          <label htmlFor="ethnicity-7">Other:</label>
          <input
            type="text"
            ref={otherRefText}
            value={otherEth}
            onFocus={() => {
              if (otherRefBox.current) {
                otherRefBox.current.checked = true;
              }
            }}
            onChange={(e) => {
              setOtherEth(e.target.value);
              setEthnicity(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="form-item">
        <label htmlFor="zip">What is your zip code?</label>
        <input
          id="zip"
          maxLength={5}
          value={zip}
          type="text"
          onChange={(e) => setZip(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="type">
          What types of meals would you like to have?
        </label>
        <input
          id="type"
          value={type}
          type="text"
          onChange={(e) => setType(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="ingredients">
          Are there any particular ingredients you’d like to see?
        </label>
        <input
          id="ingredients"
          value={ingredients}
          type="text"
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="days">
          How many days a week do you access meals from Town Fridges?
        </label>
        <input
          id="days"
          value={days}
          type="number"
          onChange={(e) => setDays(e.target.value)}
        />
      </div>

      {!isLoading ? <input type="submit" value="Submit" /> : <Loading />}
    </form>
  );
};

export default TextSignupSurvey;
