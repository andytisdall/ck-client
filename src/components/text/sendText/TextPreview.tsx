// import { useState, useEffect } from 'react';
import { format } from 'date-fns-tz';

import { Region } from '../../../state/apis/textApi';

interface TextPreviewProps {
  onSubmit: () => void;
  message: string;
  region: Region;
  photo?: File | string;
  onCancel: () => void;
  number?: string;
  sendAt?: string;
}

const TextPreview = ({
  onSubmit,
  message,
  region,
  photo,
  onCancel,
  number,
  sendAt,
}: TextPreviewProps) => {
  const getSrc = () => {
    if (photo) {
      if (typeof photo !== 'string') {
        return URL.createObjectURL(photo);
      }
      return photo;
    }
  };

  return (
    <div>
      <h3>Confirm Your Message:</h3>
      <div className="text-preview">{message}</div>
      {photo && <img className="photo-preview" src={getSrc()} alt="preview" />}

      <div>
        <p>Region: {region}</p>
        <p>To: {!!number ? number : 'All Subscribers in this Region'}</p>
      </div>

      {sendAt && (
        <p>
          Scheduled to send at {format(new Date(sendAt), 'MM/dd/yy hh:mm a')}
        </p>
      )}

      <button
        className="send-btn"
        onClick={() => {
          onSubmit();
        }}
      >
        Send Message
      </button>

      <button
        className="send-btn cancel"
        onClick={() => {
          onCancel();
        }}
      >
        Go Back to Text Compose
      </button>
    </div>
  );
};

export default TextPreview;
