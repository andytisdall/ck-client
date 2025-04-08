import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../../reusable/loading/Loading";
import TextPreview from "../sendText/TextPreview";
import "../sendText/SendText.css";
//@ts-ignore
import { formatNumber } from "../feedback/Feedback";
import FileInput from "../../reusable/file/FileInput";
import { useSendTextMutation } from "../../../state/apis/textApi";
import { Region } from "../../../state/apis/textApi";

export type ReplyToProps = {
  region: Region;
  sender: string;
  id: string;
  message: string;
};

const CustomText = ({ replyTo }: { replyTo?: ReplyToProps }) => {
  const [sendText, sendTextResult] = useSendTextMutation({
    fixedCacheKey: "sent-text",
  });

  const [message, setMessage] = useState("");
  const [region, setRegion] = useState<Region | "both" | null>(
    replyTo?.region ? replyTo.region : null
  );
  const [number, setNumber] = useState(
    replyTo?.sender ? formatNumber(replyTo.sender) : ""
  );
  const [photo, setPhoto] = useState<File | string | undefined>();
  const [imageError, setImageError] = useState(false);

  const [preview, setPreview] = useState(false);

  const navigate = useNavigate();

  const numberRef = useRef<HTMLInputElement | null>(null);
  const numberTextRef = useRef<HTMLInputElement | null>(null);

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
                  setNumber("");
                  setRegion("EAST_OAKLAND");
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
                  setRegion("WEST_OAKLAND");
                  setNumber("");
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
              onChange={(e) => {
                if (e.target.checked) {
                  setRegion("both");
                  setNumber("");
                }
              }}
            />
            <label htmlFor="to-3">East & West Oakland</label>
          </div>

          <div className="send-text-variables-radio">
            <input
              required
              id="to-4"
              name="to"
              type="radio"
              ref={numberRef}
              onChange={(e) => {
                if (e.target.checked && numberTextRef.current) {
                  const ref = numberTextRef.current as HTMLInputElement;
                  ref.focus();
                }
              }}
            />
            <label htmlFor="to-4">Phone Number:</label>
            <input
              type="text"
              value={number}
              ref={numberTextRef}
              onFocus={() => {
                if (numberRef.current) {
                  numberRef.current.checked = true;
                }
              }}
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
            <label>Photo (Optional):</label>
            <div className="send-text-photo-field-container">
              <FileInput
                file={typeof photo !== "string" ? photo : undefined}
                setFile={setPhoto}
                label="Upload Photo:"
              />
            </div>
            <div className="send-text-photo-field-or">Or</div>
            <div className="send-text-photo-field-container">
              <label>Paste Photo URL:</label>
              <input
                className={`send-text-photo-field ${
                  imageError && "send-text-photo-field-error"
                }`}
                value={!photo ? "" : typeof photo !== "string" ? "" : photo}
                onChange={(e) => {
                  setImageError(false);
                  setPhoto(e.target.value);
                }}
              />
              {!!photo && typeof photo === "string" && (
                <div
                  className="send-text-photo-field-clear"
                  onClick={() => {
                    setPhoto("");
                    setImageError(false);
                  }}
                >
                  X
                </div>
              )}
            </div>
          </div>

          <button
            className={`send-btn ${btnActive ? "" : "btn-inactive"}`}
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
    if (sendTextResult.isLoading) {
      return <Loading />;
    }
    if (!preview) {
      return composeText();
    }
    if (region || number) {
      return (
        <TextPreview
          message={message}
          region={region || undefined}
          photo={photo}
          number={number}
          onSubmit={() => {
            if (region || number) {
              sendText({
                // region not used because number is included
                region: region || "EAST_OAKLAND",
                message,
                photo,
                feedbackId: replyTo?.id,
                number,
              })
                .unwrap()
                .then(() => navigate("../text-success"));
            }
          }}
          onCancel={() => setPreview(false)}
        />
      );
    }
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

export default CustomText;
