const TextPreview = ({ onSubmit, message, region, photo, onCancel }) => {
  const setIframeDimensions = (e) => {
    const iFrame = e.target;
    const { scrollHeight, scrollWidth } = iFrame.contentWindow.document.body;
    console.log(scrollHeight, scrollWidth);
    iFrame.height = scrollHeight;
    iFrame.width = scrollWidth;
  };

  return (
    <div>
      <h3>Confirm Your Message:</h3>
      <div className="text-preview">{message}</div>
      <div>
        <p>Region: {region}</p>
      </div>
      <div>
        {photo && (
          <img
            className="photo-preview"
            src={URL.createObjectURL(photo)}
            //   onLoad={setIframeDimensions}
            //   title="photo preview"
          />
        )}
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
