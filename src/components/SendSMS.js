import { useState } from 'react';

import server from '../api';
import './SendSMS.css';

const SendSMS = ({ setError }) => {
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const sendMessage = async () => {
    try {
      const res = await server.post('/sms', { message });
      if (res.data === 'Message Sent!') {
        setSentSuccess(true);
        setError(null);
      }
    } catch (err) {
      setError(err.response?.data || 'Could not send message');
    }
  };

  const renderSuccess = () => {
    return <div className="sent-success">Message Sent!</div>;
  };

  return (
    <div>
      <input
        type="textarea"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          if (sentSuccess) {
            setSentSuccess(false);
          }
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      {sentSuccess && renderSuccess()}
    </div>
  );
};

export default SendSMS;
