import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { compressImage } from "../sendText/compressFile";

import FileInput from "../../reusable/file/FileInput";
import Loading from "../../reusable/loading/Loading";
import TextPreview from "../sendText/TextPreview";
import "../sendText/SendText.css";
import { formatNumber } from "../feedback/Feedback";
import { useSendTextMutation } from "../../../state/apis/textApi";
import { Region } from "../../../state/apis/textApi";
import { useDebounce } from "../../../hooks/useDebounce";

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
  const [region, setRegion] = useState<Region | "all" | null>(
    replyTo?.region ? replyTo.region : null,
  );
  const [number, setNumber] = useState(
    replyTo?.sender ? formatNumber(replyTo.sender) : "",
  );
  const [photo, setPhoto] = useState<File | FileList | string | undefined>();
  const [imageError, setImageError] = useState("");
  const debouncedPhoto = useDebounce(photo);

  const [preview, setPreview] = useState(false);

  const navigate = useNavigate();

  const numberRef = useRef<HTMLInputElement | null>(null);
  const numberTextRef = useRef<HTMLInputElement | null>(null);

  const renderPhoto = () => {
    if (imageError) {
      return (
        <div className="send-text-small-photo">
          <div className="send-text-photo-error">{imageError}</div>
        </div>
      );
    }
    if (debouncedPhoto) {
      let src = "";
      if (typeof debouncedPhoto === "string") {
        src = debouncedPhoto;
      } else if (debouncedPhoto instanceof Blob) {
        src = URL.createObjectURL(debouncedPhoto);
      } else {
        src = URL.createObjectURL(debouncedPhoto[0]);
      }
      return (
        <div className="send-text-small-photo">
          <img
            onError={() => {
              const message =
                typeof debouncedPhoto === "string"
                  ? "Photo URL is not a valid image"
                  : "File format is incorrect";
              setImageError(message);
            }}
            src={src}
            alt="meal"
          />
        </div>
      );
    }
  };

  const composeText = () => {
    const btnActive = (message || photo) && (region || number);
    return (
      <div className="send-text">
        <div className="send-text-variables">
          <div className="send-text-section">
            <div className="send-text-section-title">To:</div>

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
                id="to-2"
                name="to"
                type="radio"
                onChange={(e) => {
                  if (e.target.checked) {
                    setRegion("BERKELEY");
                    setNumber("");
                  }
                }}
              />
              <label htmlFor="to-2">Berkeley</label>
            </div>

            <div className="send-text-variables-radio">
              <input
                required
                id="to-3"
                name="to"
                type="radio"
                onChange={(e) => {
                  if (e.target.checked) {
                    setRegion("all");
                    setNumber("");
                  }
                }}
              />
              <label htmlFor="to-3">All Regions</label>
            </div>

            <div className="send-text-variables-radio">
              <input
                required
                id="to-4"
                name="to"
                type="radio"
                ref={numberRef}
                defaultChecked={!!replyTo?.sender}
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
          </div>
          <div className="send-text-section">
            <label htmlFor="message" className="send-text-section-title">
              Message:
            </label>
            <div className="send-text-variables-item">
              <textarea
                required
                id="message"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
          </div>
          <div className="send-text-section">
            <div className="send-text-section-title">Photo (Optional):</div>
            <div className="send-text-variables-item">
              <div className="send-text-photo-field-container">
                <FileInput
                  file={typeof photo === "string" ? undefined : photo}
                  setFile={async (e) => {
                    const file = e;
                    if (file instanceof FileList) {
                      const promises = Array.from(file).map((file) => {
                        return compressImage(file);
                      });
                      const files = await Promise.all(promises);
                      const fileList = new DataTransfer();
                      files.forEach((f) => fileList.items.add(f));
                      setPhoto(fileList.files);
                    } else if (file) {
                      const f = await compressImage(file);
                      setPhoto(f);
                    }
                  }}
                  label="Upload Photo:"
                />
              </div>
              <div className="send-text-photo-field-or">Or</div>
              <div className="send-text-photo-field-container">
                <label htmlFor="photo-url">Paste Photo URL:</label>
                <input
                  className={`send-text-photo-field ${
                    imageError && "send-text-photo-field-error"
                  }`}
                  value={!photo ? "" : typeof photo !== "string" ? "" : photo}
                  onChange={(e) => {
                    setImageError("");
                    setPhoto(e.target.value);
                  }}
                  id="photo-url"
                />
                {!!photo && typeof photo === "string" && (
                  <div
                    className="send-text-photo-field-clear"
                    onClick={() => {
                      setPhoto("");
                      setImageError("");
                    }}
                  >
                    X
                  </div>
                )}
              </div>
              {renderPhoto()}
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
          onSubmit={async () => {
            if (region || number) {
              await sendText({
                // region not used because number is included
                region: region || "EAST_OAKLAND",
                message,
                photo,
                feedbackId: replyTo?.id,
                number,
              }).unwrap();
              navigate("../text-success");
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
