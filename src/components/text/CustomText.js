import { connect } from 'react-redux';
import { useState, useRef } from 'react';

import Loading from '../reusable/Loading';
import * as actions from '../../actions';
import TextPreview from './TextPreview';
import useLoading from '../../hooks/useLoading';
import './SendText.css';
import { formatNumber } from './Feedback';
import FileInput from '../reusable/FileInput';

const CustomText = ({ sendText, replyTo }) => {
  const [message, setMessage] = useState('');
  const [region, setRegion] = useState(null);
  const [number, setNumber] = useState(
    replyTo?.sender ? formatNumber(replyTo.sender) : ''
  );
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(false);

  const [loading, setLoading] = useLoading();

  const numberRef = useRef();
  const numberTextRef = useRef();

  // const processPhoto = (e) => {
  //   const { files } = e.target;
  //   if (files[0]) {
  //     setPhoto(files[0]);
  //   }
  // };

  const composeText = () => {
    const btnActive = message && (region || number);
    return (
      <div className="send-text">
        <div className="send-text-variables">
          <label>To:</label>

          <div className="send-text-variables-radio">
            <input
              required
              id="to-1"
              name="to"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setRegion('EAST_OAKLAND');
                }
              }}
            />
            <label htmlFor="to-1">East Oakland</label>
          </div>

          <div className="send-text-variables-radio">
            <input
              required
              id="to-2"
              name="to"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setRegion('WEST_OAKLAND');
                }
              }}
            />
            <label htmlFor="to-2">West Oakland</label>
          </div>

          <div className="send-text-variables-radio">
            <input
              required
              id="to-3"
              name="to"
              type="radio"
              ref={numberRef}
              checked={!region}
              onChange={(e) => {
                if (e.target.checked) {
                  setRegion(null);
                  numberTextRef.current.focus();
                }
              }}
            />
            <label htmlFor="to-3">Phone Number:</label>
            <input
              type="text"
              value={number}
              ref={numberTextRef}
              onFocus={() => (numberRef.current.checked = true)}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="message">Message:</label>
            <textarea
              required
              id="message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
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
    return (
      <TextPreview
        message={message}
        region={region}
        photo={photo}
        number={number}
        onSubmit={() => {
          sendText(message, region, photo, replyTo?.id, number);
          setLoading(true);
        }}
        onCancel={() => setPreview(false)}
      />
    );
  };

  const renderOriginalMessage = () => {
    if (replyTo?.message) {
      return (
        <div className="send-text-original-message">
          <p>Original Message:</p>
          <p>{replyTo.message}</p>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Send a Text</h2>
      {renderOriginalMessage()}
      {renderContent()}
    </div>
  );
};

export default connect(null, actions)(CustomText);
