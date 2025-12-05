import { format } from "date-fns-tz";

interface TextPreviewProps {
  onSubmit: () => void;
  message?: string;
  region?: string;
  photo?: File | FileList | string;
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
  const getSrcs = () => {
    if (photo) {
      if (photo instanceof FileList) {
        return Array.from(photo).map((p) => URL.createObjectURL(p));
      }
      if (typeof photo !== "string") {
        return [URL.createObjectURL(photo)];
      }
      return [photo];
    }
    return [];
  };

  return (
    <div>
      <h3>Confirm Your Message:</h3>
      <div className="text-preview">{message}</div>
      <div>
        {getSrcs().map((src) => (
          <img key={src} className="photo-preview" src={src} alt="preview" />
        ))}
      </div>

      <div>
        {!!region && <p>Region: {region}</p>}
        <p>To: {!!number ? number : "All Subscribers in this Region"}</p>
      </div>

      {sendAt && (
        <p>
          Scheduled to send at {format(new Date(sendAt), "MM/dd/yy hh:mm a")}
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
