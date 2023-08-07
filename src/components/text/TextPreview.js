// import { useState, useEffect } from 'react';
import { format } from 'date-fns-tz';

const TextPreview = ({
  onSubmit,
  message,
  region,
  photo,
  onCancel,
  number,
  sendAt,
}) => {
  // const [image, setImage] = useState(photo);

  // useEffect(() => {
  //   if (photo?.name?.toLowerCase().includes('.heic')) {
  //     setImage(null);
  //     const convert = async () => {
  //       const pic = await heic2any({
  //         blob: photo,
  //         toType: 'image/jpeg',
  //         quality: 0.3,
  //       });
  //       setImage(pic);
  //     };
  //     convert();
  //   }
  // }, [photo]);

  const getSrc = () => {
    if (photo?.name) {
      return URL.createObjectURL(photo);
    }
    return photo;
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
