import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

import { sendText } from '../../actions';
import TextPreview from './TextPreview';
import './SendText.css';
import { townFridges } from './townFridges';

const SendText = ({ sendText, alert, error }) => {
  const [fridge, setFridge] = useState('');
  const [mealCount, setMealCount] = useState(25);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [time, setTime] = useState('12:00');
  const [source, setSource] = useState('CK Home Chef Volunteers');
  const [name, setName] = useState('');
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const SURVEY_URL = '';

  const message =
    fridge &&
    `Good afternoon! ${townFridges[fridge].name}, at ${
      townFridges[fridge].address
    } has been stocked with ${mealCount} meals on ${moment(
      `${date} ${time}`
    ).format(
      'MM/DD [at] hh:mm a'
    )}, made with love by ${source}! The meal today is ${name}.  Please respond to this message with any feedback.  If you are able to complete our short survey, it is anonymous and helps greatly with funding to provide free meals to the people. ${SURVEY_URL} Enjoy!`;

  useEffect(() => {
    if (alert) {
      navigate('../text-success');
    }
    if (error) {
      setLoading(false);
    }
  }, [alert, navigate, error]);

  const getRegion = () => {
    const { region } = townFridges[fridge];
    if (region === 'EAST_OAKLAND') {
      return 'East Oakland';
    }
    if (region === 'WEST_OAKLAND') {
      return 'West Oakland';
    }
  };

  const composeText = () => {
    const btnActive =
      fridge && date && message && time && source && name && mealCount > 0;

    return (
      <div className="send-text">
        <div className="send-text-variables">
          <div className="send-text-variables-item">
            <label htmlFor="date">Date:</label>
            <input
              required
              name="date"
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="time">Time:</label>
            <input
              required
              name="time"
              type="time"
              step={3600}
              onChange={(e) => setTime(e.target.value)}
              value={time}
            />
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="name">Name of Meal:</label>
            <textarea
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="mealCount">Number of Meals:</label>
            <input
              type="number"
              value={mealCount}
              name="mealCount"
              onChange={(e) => setMealCount(e.target.value)}
              min={1}
            />
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="source">Prepared By:</label>
            <textarea
              value={source}
              name="source"
              onChange={(e) => setSource(e.target.value)}
            />
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="fridge">Town Fridge Location:</label>
            <div className="fridge">
              <select
                required
                name="fridge"
                value={fridge}
                onChange={(e) => setFridge(e.target.value)}
              >
                <option value="">Select a Town Fridge</option>
                {townFridges.map((f, i) => (
                  <option value={i} key={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>

              {fridge && (
                <div>
                  <span className="fridge-info">Address: </span>
                  {townFridges[fridge].address}
                </div>
              )}

              {fridge && (
                <div>
                  <span className="fridge-info">Region: </span>
                  {getRegion()}
                </div>
              )}
            </div>
          </div>

          <button
            className={`send-btn ${btnActive ? '' : 'btn-inactive'}`}
            onClick={() => {
              if (btnActive) {
                setPreview(true);
              }
            }}
          >
            Preview Message
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return <Spinner size={15} color="black" style={{ margin: '2rem' }} />;
    }
    if (!preview) {
      return composeText();
    }
    return (
      <TextPreview
        message={message}
        region={getRegion()}
        onSubmit={() => {
          sendText(message, townFridges[fridge].region);
          setLoading(true);
        }}
        onCancel={() => setPreview(false)}
      />
    );
  };

  return (
    <div>
      <h2>Send a Text</h2>
      {renderContent()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert.message,
    error: state.error.error,
  };
};

export default connect(mapStateToProps, { sendText })(SendText);
