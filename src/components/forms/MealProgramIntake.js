import { connect } from 'react-redux';
import { useState, useRef } from 'react';

import Loading from '../reusable/Loading';
import * as actions from '../../actions';
import useLoading from '../../hooks/useLoading';

const successMessage =
  'Thank you for you giving us some information about your restaurant. Community Kitchens will be in touch with future opportunies to feed the community!';

const MealProgramIntake = ({ submitForm }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState();
  const [ethnicity, setEthnicity] = useState('');
  const [mixedRace, setMixedRace] = useState('');
  const [otherEth, setOtherEth] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [female, setFemale] = useState(false);

  const [loading, setLoading] = useLoading();

  const mixedRefBox = useRef();
  const mixedRefText = useRef();
  const otherRefBox = useRef();
  const otherRefText = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    submitForm(
      {
        name,
        ethnicity,
        female,
        address,
        date,
        type,
      },
      { name: 'MEAL_PROGRAM_INTAKE', successMessage }
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-item">
        <h1>Community Kitchens Survey</h1>
      </div>

      <div className="form-item">
        <label for="name">Restaurant Name:</label>
        <input
          required
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label for="date">Date Opened:</label>
        <input
          required
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label>
          Is your restaurant fully or partially owned by people of color (POC)?
        </label>
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
            id="ethnicity-6"
            name="ethnicity"
            type="radio"
            ref={mixedRefBox}
            onChange={(e) => {
              if (e.target.checked) {
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
            onFocus={() => (mixedRefBox.current.checked = true)}
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
              if (e.target.checked) {
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
            onFocus={() => (otherRefBox.current.checked = true)}
            onChange={(e) => {
              setOtherEth(e.target.value);
              setEthnicity(e.target.value);
            }}
          />
        </div>
        <div className="form-checkbox">
          <input
            id="ethnicity-5"
            name="ethnicity"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setEthnicity('None');
              }
            }}
          />
          <label htmlFor="ethnicity-5">Not POC Owned</label>
        </div>
      </div>

      <div className="form-item">
        <label htmlFor="female">
          Is your restaurant fully or partially female-owned?
        </label>
        <input
          id="female"
          value={female}
          type="checkbox"
          onChange={(e) => setFemale(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="address">Street Address:</label>
        <input
          id="address"
          value={address}
          type="text"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="type">What types of food do you serve?</label>
        <input
          id="type"
          value={type}
          type="text"
          onChange={(e) => setType(e.target.value)}
        />
      </div>

      {!loading ? <input type="submit" value="Submit" /> : <Loading />}
    </form>
  );
};

export default connect(null, actions)(MealProgramIntake);
