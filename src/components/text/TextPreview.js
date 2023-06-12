import heic2any from 'heic2any';
import { useState, useEffect } from 'react';

import Loading from '../reusable/Loading';

const TextPreview = ({
  onSubmit,
  message,
  region,
  photo,
  onCancel,
  number,
}) => {
  const [image, setImage] = useState(photo);

  useEffect(() => {
    if (photo?.name?.toLowerCase().includes('.heic')) {
      setImage(null);
      const convert = async () => {
        const pic = await heic2any({
          blob: photo,
          toType: 'image/jpeg',
          quality: 0.3,
        });
        setImage(pic);
      };
      convert();
    }
  }, [photo]);

  const getSrc = () => {
    if (photo?.name) {
      return URL.createObjectURL(image);
    }
    return photo;
  };

  return (
    <div>
      <h3>Confirm Your Message:</h3>
      <div className="text-preview">{message}</div>
      {photo && !image && <Loading />}
      {image && <img className="photo-preview" src={getSrc()} alt="preview" />}

      <div>
        <p>To: {region || number}</p>
      </div>

      <button
        className="send-btn"
        onClick={() => {
          onSubmit();
        }}
      >
        Send Message
      </button>

      <button
        className="send-btn"
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
