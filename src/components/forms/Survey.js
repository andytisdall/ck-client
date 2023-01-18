import { connect } from 'react-redux';
import { useState } from 'react';

const Survey = ({ submitSurvey }) => {
  // “Please tell us the name of your meal.”
  // “Please tell us the location you received it”
  // “On a scale of 1-5 how would you rate the taste of your meal?”
  // “On a scale of 1-5 how would you rate the size of your meal?”
  // “What types of meals would you like to have?”
  // “Are there any particular ingredients you’d like to see?”
  // How many days a week do you access meals from Town Fridges?
  // What is your age?
  // What is your ethnicity?
  // What is your zip code?
  const [mealName, setMealName] = useState('');
  const [location, setLocation] = useState('');
  const [taste, setTaste] = useState('');
  const [size, setSize] = useState('');
  const [type, setType] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [days, setDays] = useState('');
  const [age, setAge] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [zip, setZip] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    submitSurvey({
      mealName,
      location,
      taste,
      size,
      type,
      ingredients,
      days,
      age,
      ethnicity,
      zip,
    });
  };

  return (
    <div className="form-background">
      <form onSubmit={onSubmit} className="form">
        <div className="form-item">
          <h1>Community Kitchens Meal Survey</h1>
        </div>

        <div className="form-item">
          <label htmlFor="mealName">
            Please tell us the name of your meal:
          </label>
          <input
            name="mealName"
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
            name="location"
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
                name="taste-1"
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
                name="taste-2"
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
                name="taste-3"
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
                name="taste-4"
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
                name="taste-5"
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
                name="size-1"
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
                name="size-2"
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
                name="size-3"
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
                name="size-4"
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
                name="size-5"
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
        <input type="submit" />
      </form>
    </div>
  );
};

export default connect()(Survey);
