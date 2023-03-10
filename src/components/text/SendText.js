import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from '../../actions';
import renderWithFallback from '../reusable/renderWithFallback';
import './SendText.css';
import { townFridges } from './townFridges';
import Loading from '../reusable/Loading';
import FileInput from '../reusable/FileInput';
import useLoading from '../../hooks/useLoading';

const TextPreview = React.lazy(() => import('./TextPreview'));

const SendText = ({ sendText, error }) => {
  const [fridge, setFridge] = useState('');
  const [mealCount, setMealCount] = useState(25);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [time, setTime] = useState('12:00');
  const [source, setSource] = useState('CK Home Chef Volunteers');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(false);

  const [loading, setLoading] = useLoading();

  const getAddress = () => {
    if (townFridges[fridge].address) {
      return `, at ${townFridges[fridge].address},`;
    } else {
      return '';
    }
  };

  const message =
    fridge &&
    `Good afternoon! ${
      townFridges[fridge].name
    } Town Fridge${getAddress()} has been stocked with ${mealCount} meals on ${moment(
      `${date} ${time}`
    ).format(
      'M/D [at] h:mm a'
    )}, made with love by ${source}! The meal today is ${name}. Please respond to this message with any feedback. Enjoy!`;

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

          <div className="send-text-variables-item">
            <FileInput
              file={photo}
              setFile={setPhoto}
              label="Photo (optional):"
            />
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
      return <Loading />;
    }
    if (!preview) {
      return composeText();
    }
    return renderWithFallback(
      <TextPreview
        message={message}
        region={getRegion()}
        photo={photo}
        onSubmit={() => {
          sendText(message, townFridges[fridge].region, photo);
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

export default connect(null, actions)(SendText);
