import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

import { sendText } from '../../actions';
import './SendText.css';
import { REGION_CODES } from './regionCodes';

const SendText = ({ sendText, alert, error }) => {
  const [message, setMessage] = useState('');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const template = `Hello everyone, the CK text service is being tested. Do not panic. The date that I am inserting into this message is ${moment(
    date
  ).format('M/D/YY')}. Good day!`;

  useEffect(() => {
    setMessage(template);
  }, [date, template]);

  useEffect(() => {
    if (alert) {
      navigate('../text-success');
    }
    if (error) {
      setLoading(false);
    }
  }, [alert, navigate, error]);

  return (
    <div>
      <h2>Send a Text</h2>
      <div className="send-text">
        <div className="send-text-variables">
          <div className="send-text-variables-item">
            <label htmlFor="date">Choose date:</label>
            <input
              name="date"
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>
          <div className="send-text-variables-item">
            <label htmlFor="region">Select a Region to Send to:</label>
            <select
              name="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            >
              <option value="">Select a Region</option>
              <option value={REGION_CODES.EAST_OAKLAND}>East Oakland</option>
              <option value={REGION_CODES.WEST_OAKLAND}>West Oakland</option>
            </select>
          </div>
        </div>
        <div>
          <textarea
            className="text-area"
            maxLength={320}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {message !== template && (
            <div className="text-area-warning">
              Warning: if you change the date, your changes to the message will
              be erased.
            </div>
          )}
        </div>

        {loading ? (
          <Spinner size={15} color="black" style={{ margin: '2rem' }} />
        ) : (
          <button
            className="send-btn"
            onClick={() => {
              setLoading(true);
              sendText(message, region);
            }}
          >
            Send Message
          </button>
        )}
      </div>
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
