import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../reusable/Loading';
import { submitForm } from '../../actions';

const successMessage =
  'Thank you for you giving us some information about yourself.';

const TextSignupSurvey = ({ alert, error, submitForm }) => {
  const [age, setAge] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [zip, setZip] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
    setLoading(true);
    submitForm(
      {
        age,
        ethnicity,
        zip,
      },
      { name: 'TEXT_SIGNUP_SURVEY', successMessage }
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-item">
        <h1>Community Kitchens Survey</h1>
      </div>
      <div className="form-item">
        <label htmlFor="age">What is your age?</label>
        <input
          id="age"
          value={age}
          type="number"
          min="0"
          max="120"
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="ethnicity">What is your ethnicity?</label>
        <input
          id="ethnicity"
          value={ethnicity}
          maxLength={50}
          type="text"
          onChange={(e) => setEthnicity(e.target.value)}
        />
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
      {!loading ? <input type="submit" /> : <Loading />}
    </form>
  );
};

const mapStateToProps = (state) => {
  return { alert: state.alert.message, error: state.error.error };
};

export default connect(mapStateToProps, { submitForm })(TextSignupSurvey);
