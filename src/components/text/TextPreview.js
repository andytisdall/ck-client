const TextPreview = ({ onSubmit, message, region, photo, onCancel }) => {
  return (
    <div>
      <h3>Confirm Your Message:</h3>
      <div className="text-preview">{message}</div>

      {photo && (
        <img
          className="photo-preview"
          src={URL.createObjectURL(photo)}
          alt="preview"
        />
      )}

      <div>
        <p>Region: {region}</p>
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
