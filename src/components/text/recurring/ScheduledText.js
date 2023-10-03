import { connect } from 'react-redux';
import { useState } from 'react';
import { zonedTimeToUtc } from 'date-fns-tz';
import { formatISO } from 'date-fns';

import Loading from '../../reusable/loading/Loading';
import * as actions from '../../../actions';
import TextPreview from '../sendText/TextPreview';
import useLoading from '../../../hooks/useLoading';
import '../sendText/SendText.css';
import FileInput from '../../reusable/file/FileInput';

const ScheduledText = ({ sendScheduledText }) => {
  const [message, setMessage] = useState('');
  const [region, setRegion] = useState(null);
  const [sendAt, setSendAt] = useState(null);

  const [photo, setPhoto] = useState(null);
  const [imageError, setImageError] = useState(false);

  const [preview, setPreview] = useState(false);

  const [loading, setLoading] = useLoading();

  const composeText = () => {
    const btnActive = message && region && sendAt;
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
              checked={region === 'EAST_OAKLAND'}
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
              checked={region === 'WEST_OAKLAND'}
            />
            <label htmlFor="to-2">West Oakland</label>
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="date">Send at:</label>
            <input
              type="datetime-local"
              value={sendAt}
              onChange={(e) => setSendAt(e.target.value)}
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
        onSubmit={() => {
          sendScheduledText(
            message,
            region,
            photo,
            formatISO(zonedTimeToUtc(sendAt, 'America/Los_Angeles'))
          );
          setLoading(true);
        }}
        onCancel={() => setPreview(false)}
        sendAt={sendAt}
      />
    );
  };

  return (
    <div>
      <h2>Send a Scheduled Text</h2>
      {renderContent()}
    </div>
  );
};

export default connect(null, actions)(ScheduledText);
