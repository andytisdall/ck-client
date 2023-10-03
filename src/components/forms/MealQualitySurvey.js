import { connect } from 'react-redux';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Loading from '../reusable/loading/Loading';
import * as actions from '../../actions';
import useLoading from '../../hooks/useLoading';

const successMessage =
  'Thank you for you valuable feedback about the CK meal program.';

const Survey = ({ submitForm }) => {
  const [mealName, setMealName] = useState('');
  const [location, setLocation] = useState('');
  const [taste, setTaste] = useState('');
  const [size, setSize] = useState('');
  const [type, setType] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [days, setDays] = useState('');

  const [loading, setLoading] = useLoading();

  const [searchParams] = useSearchParams();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const phone = searchParams.get('phone');
    submitForm(
      {
        mealName,
        location,
        taste,
        size,
        type,
        ingredients,
        days,
        phone,
      },
      { name: 'MEAL_SURVEY', successMessage }
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-item">
        <h1>Community Kitchens Meal Survey</h1>
      </div>
      <div className="form-item">
        <label htmlFor="mealName">Please tell us the name of your meal:</label>
        <input
          id="mealName"
          type="text"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label htmlFor="location">
          Please tell us the location you received it:
        </label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label>
          On a scale of 1-5 how would you rate the taste of your meal?
        </label>

        <div className="form-horizontal">
          <div className="form-checkbox">
            <input
              id="taste-1"
              name="taste"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setTaste('1');
                }
              }}
            />
            <label htmlFor="taste-1">1</label>
          </div>
          <div className="form-checkbox">
            <input
              id="taste-2"
              name="taste"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setTaste('2');
                }
              }}
            />
            <label htmlFor="taste-2">2</label>
          </div>
          <div className="form-checkbox">
            <input
              id="taste-3"
              name="taste"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setTaste('3');
                }
              }}
            />
            <label htmlFor="taste-3">3</label>
          </div>
          <div className="form-checkbox">
            <input
              id="taste-4"
              name="taste"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setTaste('4');
                }
              }}
            />
            <label htmlFor="taste-4">4</label>
          </div>
          <div className="form-checkbox">
            <input
              id="taste-5"
              name="taste"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setTaste('5');
                }
              }}
            />
            <label htmlFor="taste-5">5</label>
          </div>
        </div>
      </div>
      <div className="form-item">
        <label>
          On a scale of 1-5 how would you rate the size of your meal?
        </label>

        <div className="form-horizontal">
          <div className="form-checkbox">
            <input
              id="size-1"
              name="size"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setSize('1');
                }
              }}
            />
            <label htmlFor="size-1">1</label>
          </div>
          <div className="form-checkbox">
            <input
              id="size-2"
              name="size"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setSize('2');
                }
              }}
            />
            <label htmlFor="size-2">2</label>
          </div>
          <div className="form-checkbox">
            <input
              id="size-3"
              name="size"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setSize('3');
                }
              }}
            />
            <label htmlFor="size-3">3</label>
          </div>
          <div className="form-checkbox">
            <input
              id="size-4"
              name="size"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setSize('4');
                }
              }}
            />
            <label htmlFor="size-4">4</label>
          </div>
          <div className="form-checkbox">
            <input
              id="size-5"
              name="size"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setSize('5');
                }
              }}
            />
            <label htmlFor="size-5">5</label>
          </div>
        </div>
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

      {!loading ? <input type="submit" value="Submit" /> : <Loading />}
    </form>
  );
};

export default connect(null, actions)(Survey);
