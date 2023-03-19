import { connect } from 'react-redux';
import { useState, useRef } from 'react';

import Loading from '../reusable/Loading';
import * as actions from '../../actions';
import TextPreview from './TextPreview';
import useLoading from '../../hooks/useLoading';

const CustomText = ({ sendCustomText, replyTo }) => {
  const [message, setMessage] = useState('');
  const [to, setTo] = useState(replyTo?.number || '');
  const [number, setNumber] = useState(replyTo?.number || '');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(false);

  const [loading, setLoading] = useLoading();

  const numberRef = useRef();
  const numberTextRef = useRef();

  const processPhoto = (e) => {
    const { files } = e.target;
    if (files[0]) {
      setPhoto(files[0]);
    }
  };

  const composeText = () => {
    const btnActive = message && to;
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
                  setTo('EAST_OAKLAND');
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
                  setTo('WEST_OAKLAND');
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
              onChange={(e) => {
                if (e.target.checked) {
                  setTo(number);
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
                setTo(e.target.value);
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
            <label htmlFor="photo">Photo (optional):</label>
            <div className="file-input-container">
              <label htmlFor="photo" className="file-input">
                choose file
              </label>
              {photo ? (
                <>
                  <div className="file-name">{photo.name}</div>
                  <div onClick={() => setPhoto(null)} className="file-delete">
                    x
                  </div>
                </>
              ) : null}
            </div>
            <input type="file" id="photo" onChange={processPhoto} />
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
        region={to}
        photo={photo}
        onSubmit={() => {
          sendCustomText(message, to, photo, replyTo?.id);
          setLoading(true);
        }}
        onCancel={() => setPreview(false)}
      />
    );
  };

  return (
    <div>
      <h2>Send a Text</h2>
      <div>{replyTo?.message ? replyTo.message : null}</div>
      {renderContent()}
    </div>
  );
};

export default connect(null, actions)(CustomText);
