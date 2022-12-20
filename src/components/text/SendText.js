import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

import { sendText } from '../../actions';
import './SendText.css';

const SendText = ({ sendText, alert }) => {
  const [message, setMessage] = useState('');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const template = `Hello everyone, you are receiving this text because the CK text service is being tested. Do not panic. The date that I am inserting into this message is ${moment(
    date
  ).format('M/D/YY')}. Good day!`;

  useEffect(() => {
    setMessage(template);
  }, [date, template]);

  useEffect(() => {
    if (alert) {
      navigate('../text-success');
    }
  }, [alert, navigate]);

  return (
    <div>
      <h2>Send a Text</h2>
      <div className="send-text">
        <label htmlFor="date">Choose date</label>
        <input
          name="date"
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        <textarea
          className="text-area"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {loading ? (
          <Spinner size={15} color="black" style={{ margin: '2rem' }} />
        ) : (
          <button
            className="send-btn"
            onClick={() => {
              setLoading(true);
              sendText(message);
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
  };
};

export default connect(mapStateToProps, { sendText })(SendText);
