import { useState, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../../reusable/loading/Loading';
import { zipCodeOptions } from '../../reusable/form/ZipCodeSelector';
import { useSubmitFormMutation } from '../../../state/apis/formApi';

const raceOptions = [
  'African',
  'Latin',
  'Asian',
  'Native American',
  'White',
  'Other',
  'Mixed',
];

const SelfReport = () => {
  const [age, setAge] = useState('');
  const [race, setRace] = useState('');
  const [zip, setZip] = useState('');

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const navigate = useNavigate();

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    await submitForm({
      formData: { age, race, zip },
      name: 'SELF_REPORT',
    });

    navigate('/forms/form-sent', {
      state: {
        message:
          'Thank you for filling out this survey! We will use your info to improve our free meal program.',
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-item">
        <h1>CBO Monthly Report</h1>
        <p>Please fill out and submit this form by the 3rd of every month</p>
      </div>
      <div className="form-item">
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label>Race</label>
        <select onChange={(e) => setRace(e.target.value)}>
          <option value="">Select an option</option>
          {raceOptions.map((raceOp) => (
            <option value={raceOp} key={raceOp}>
              {raceOp}
            </option>
          ))}
        </select>
      </div>

      <div className="form-item">
        <label>Zip Code</label>
        <select onChange={(e) => setZip(e.target.value)}>
          <option value="">Select an option</option>
          {zipCodeOptions.map((zipOp) => (
            <option value={zipOp} key={zipOp}>
              {zipOp}
            </option>
          ))}
        </select>
      </div>

      {!isLoading ? <input type="submit" value="Submit" /> : <Loading />}
    </form>
  );
};

export default SelfReport;
