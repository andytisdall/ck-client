import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from '../../../actions';
import renderWithFallback from '../../reusable/renderWithFallback';
import './SendText.css';
import Loading from '../../reusable/Loading';
import useLoading from '../../../hooks/useLoading';
import FileInput from '../../reusable/FileInput';

const TextPreview = React.lazy(() => import('./TextPreview'));

const SendText = ({ sendText, townFridges }) => {
  const [fridge, setFridge] = useState('');
  const [mealCount, setMealCount] = useState(25);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [time, setTime] = useState(moment().format('HH:mm'));
  const [source, setSource] = useState('CK Home Chef Volunteers');
  const [imageError, setImageError] = useState(false);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [dietary, setDietary] = useState('');
  const [preview, setPreview] = useState(false);

  const [loading, setLoading] = useLoading();

  const getAddress = () => {
    if (townFridges[fridge].address) {
      return `, at ${townFridges[fridge].address},`;
    } else {
      return '';
    }
  };

  const getDietaryInfo = () => {
    if (dietary) {
      return `This meal is ${dietary}. `;
    } else {
      return '';
    }
  };

  const message =
    fridge &&
    `Hello! ${
      townFridges[fridge].name
    } Town Fridge${getAddress()} has been stocked with ${mealCount} meals on ${moment(
      `${date} ${time}`
    ).format(
      'M/D [at] h:mm a'
    )}, made with love by ${source}! Please take only what you need, and leave the rest to share. The meal today is ${name}. ${getDietaryInfo()}Please respond to this message with any feedback. Enjoy!`;

  const getRegion = () => {
    const { region } = townFridges[fridge];
    if (region === 'EAST_OAKLAND') {
      return 'East Oakland';
    }
    if (region === 'WEST_OAKLAND') {
      return 'West Oakland';
    }
  };

  const renderPhoto = () => {
    if (imageError) {
      return (
        <div className="send-text-small-photo">
          <div className="send-text-photo-error">
            Photo URL is not a valid image
          </div>
        </div>
      );
    }
    if (photo) {
      let src = photo;
      if (photo.name) {
        src = URL.createObjectURL(photo);
      }
      return (
        <div className="send-text-small-photo">
          <img onError={() => setImageError(true)} src={src} alt="meal" />
        </div>
      );
    }
  };

  const composeText = () => {
    const btnActive =
      fridge &&
      date &&
      message &&
      time &&
      source &&
      name &&
      mealCount > 0 &&
      !(photo && imageError);

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
              className="send-text-time"
              required
              name="time"
              type="time"
              onChange={(e) => setTime(e.target.value)}
              value={time}
            />
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="fridge">Town Fridge Location:</label>
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
            <div className="fridge">
              {fridge && (
                <div className="fridge-info">
                  <div className="fridge-info-label">Address: </div>
                  {townFridges[fridge].address}
                </div>
              )}

              {fridge && (
                <div className="fridge-info">
                  <div className="fridge-info-label">Region: </div>
                  {getRegion()}
                </div>
              )}
            </div>
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
            <label htmlFor="dietary">Dietary Information (optional):</label>
            <textarea
              value={dietary}
              name="dietary"
              onChange={(e) => setDietary(e.target.value)}
            />
          </div>

          <div className="send-text-variables-item">
            <label>Photo (Optional):</label>
            <div className="send-text-photo-field-container">
              <FileInput
                file={photo?.name ? photo : null}
                setFile={setPhoto}
                label="Upload Photo:"
              />
            </div>
            <div className="send-text-photo-field-or">Or</div>
            <div className="send-text-photo-field-container">
              <label>Paste Photo URL:</label>
              <input
                className={`send-text-photo-field ${
                  imageError && 'send-text-photo-field-error'
                }`}
                value={!photo ? '' : photo.name ? '' : photo}
                onChange={(e) => {
                  setImageError(false);
                  setPhoto(e.target.value);
                }}
              />
              {!!photo && !photo.name && (
                <div
                  className="send-text-photo-field-clear"
                  onClick={() => {
                    setPhoto('');
                    setImageError(false);
                  }}
                >
                  X
                </div>
              )}
            </div>
          </div>
          {renderPhoto()}
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
    if (loading || !townFridges) {
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

const mapStateToProps = (state) => {
  return { townFridges: state.homeChef.townFridges };
};

export default connect(mapStateToProps, actions)(SendText);
