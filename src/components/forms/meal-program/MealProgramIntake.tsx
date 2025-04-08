import { useState, FormEventHandler } from 'react';
import { useDispatch } from 'react-redux';

import { setAlert } from '../../../state/apis/slices/alertSlice';
import Loading from '../../reusable/loading/Loading';
import { useSubmitFormMutation } from '../../../state/apis/formApi';
import { useNavigate } from 'react-router-dom';

const successMessage =
  'Thank you for giving us some information about your restaurant. Community Kitchens will be in touch with future opportunies to feed the community!';

const MealProgramIntake = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const [contactName, setContactName] = useState('');
  const [contactPosition, setContactPosition] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [date, setDate] = useState('');
  const [bipoc, setBipoc] = useState<boolean>();
  const [female, setFemale] = useState<boolean>();
  const [neighborhood, setNeighborhood] = useState('');
  const [hardship, setHardship] = useState<boolean>();
  const [ebt, setEbt] = useState<boolean>();
  const [deliver, setDeliver] = useState<boolean>();
  const [source, setSource] = useState('');
  const [food, setFood] = useState('');

  const [submitForm, { isLoading }] = useSubmitFormMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const neighborhoodList = [
    'Rockridge',
    'Uptown',
    'Grand Lake',
    'Laurel',
    'Fruitvale',
    'Jack London Square',
    'Old Oakland',
    'Temescal',
    'East Oakland',
    'Dimond',
  ];

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    submitForm({
      formData: {
        name,
        contactName,
        contactEmail,
        contactNumber,
        contactPosition,
        bipoc: bipoc || false,
        female: female || false,
        address,
        date,
        neighborhood,
        hardship: hardship || false,
        ebt: ebt || false,
        deliver: deliver || false,
        source,
        food,
      },
      name: 'MEAL_PROGRAM_INTAKE',
    })
      .unwrap()
      .then(() => {
        dispatch(setAlert(successMessage));
        navigate('/forms/form-sent');
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-item">
        <h1>Community Kitchens Survey</h1>
        <p>
          Thank you for your interest in becoming a CK restaurant partner! Help
          us get to know you by filling out the questionnaire below.
        </p>
      </div>

      <div className="form-item">
        <div className="form-title">Restaurant Information:</div>
        <div className="form-horizontal">
          <label htmlFor="name">Restaurant Name:</label>
          <input
            required
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-horizontal">
          <label htmlFor="name">Restaurant Address:</label>
          <input
            required
            id="name"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-horizontal">
          <label htmlFor="date">Date Opened:</label>
          <input
            required
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="form-item">
        <div className="form-title">Contact Information:</div>
        <div className="form-horizontal">
          <label htmlFor="name">Name:</label>
          <input
            required
            id="name"
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>
        <div className="form-horizontal">
          <label htmlFor="position">Position:</label>
          <input
            required
            id="position"
            type="text"
            value={contactPosition}
            onChange={(e) => setContactPosition(e.target.value)}
          />
        </div>{' '}
        <div className="form-horizontal">
          <label htmlFor="email">Email Address:</label>
          <input
            required
            id="email"
            type="text"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>
        <div className="form-horizontal">
          <label htmlFor="number">Phone Number:</label>
          <input
            required
            id="number"
            type="text"
            min={10}
            max={10}
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>
      </div>

      <div className="form-item">
        <label>
          Does the restaurant owner(s) identify as Black, Indigenous, or People
          of Color (BIPOC)?
        </label>
        <div className="form-checkbox">
          <input
            required
            name="bipoc"
            id="bipoc-yes"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setBipoc(true);
              }
            }}
          />
          <label htmlFor="bipoc-yes">Yes</label>
        </div>{' '}
        <div className="form-checkbox">
          <input
            required
            name="bipoc"
            id="bipoc-no"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setBipoc(false);
              }
            }}
          />
          <label htmlFor="bipoc-no">No</label>
        </div>
      </div>

      <div className="form-item">
        <label>Is your restaurant fully or partially female-owned?</label>
        <div className="form-checkbox">
          <input
            required
            name="female"
            id="female-yes"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setFemale(true);
              }
            }}
          />
          <label htmlFor="female-yes">Yes</label>
        </div>
        <div className="form-checkbox">
          <input
            required
            name="female"
            id="female-no"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setFemale(false);
              }
            }}
          />
          <label htmlFor="female-no">No</label>
        </div>
      </div>
      <div className="form-item">
        <div className="form-horizontal">
          <label>What neighborhood is your restaurant located in?</label>
          <select
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            required
          >
            <option value={undefined}>Select a Neighborhood</option>
            {neighborhoodList.map((n) => {
              return (
                <option key={n} value={n}>
                  {n}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="form-item">
        <label>Is your restaurant experiencing financial hardship?</label>
        <div className="form-checkbox">
          <input
            required
            name="hardship"
            id="hardship-yes"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setHardship(true);
              }
            }}
          />
          <label htmlFor="hardship-yes">Yes</label>
        </div>
        <div className="form-checkbox">
          <input
            required
            name="hardship"
            id="hardship-no"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setHardship(false);
              }
            }}
          />
          <label htmlFor="hardship-no">No</label>
        </div>
      </div>

      <div className="form-item">
        <label>
          Are you interested in accepting EBT/CalFresh at your restaurant?
        </label>
        <div className="form-checkbox">
          <input
            required
            name="ebt"
            id="ebt-yes"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setEbt(true);
              }
            }}
          />
          <label htmlFor="ebt-yes">Yes</label>
        </div>
        <div className="form-checkbox">
          <input
            required
            name="ebt"
            id="ebt-no"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setEbt(false);
              }
            }}
          />
          <label htmlFor="ebt-no">No</label>
        </div>
      </div>

      <div className="form-item">
        <label>Are you able to deliver?</label>
        <div className="form-checkbox">
          <input
            required
            name="deliver"
            id="deliver-yes"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setDeliver(true);
              }
            }}
          />
          <label htmlFor="deliver-yes">Yes</label>
        </div>
        <div className="form-checkbox">
          <input
            required
            name="deliver"
            id="deliver-no"
            type="radio"
            onChange={(e) => {
              if (e.target.checked) {
                setDeliver(false);
              }
            }}
          />
          <label htmlFor="deliver-no">No</label>
        </div>
      </div>

      <div className="form-item">
        <label htmlFor="source">
          How did you hear about Community Kitchens restaurant meal programs?
        </label>
        <input
          id="source"
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />
      </div>

      <div className="form-item">
        <label htmlFor="food">
          In a few words please describe the type of cuisine you serve:
        </label>
        <input
          id="food"
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          required
        />
      </div>

      {!isLoading ? <input type="submit" value="Submit" /> : <Loading />}
    </form>
  );
};

export default MealProgramIntake;
