import { lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import renderWithFallback from "../../reusable/loading/renderWithFallback";
import "./SendText.css";
import Loading from "../../reusable/loading/Loading";
import FileInput from "../../reusable/file/FileInput";
import { useGetFridgesQuery } from "../../../state/apis/textApi/sendTextApi";
import { useSendTextMutation } from "../../../state/apis/textApi";

const TextPreview = lazy(() => import("./TextPreview"));

const SendText = () => {
  const [fridge, setFridge] = useState<number | undefined>();
  const [mealCount, setMealCount] = useState(25);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = useState(format(new Date(), "HH:mm"));
  const [source, setSource] = useState("CK Home Chef Volunteers");
  const [imageError, setImageError] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<File | string | undefined>(undefined);
  const [dietary, setDietary] = useState("");
  const [preview, setPreview] = useState(false);

  const fridgeQuery = useGetFridgesQuery();
  const fridges = fridgeQuery.data;

  const [sendText, sendTextResult] = useSendTextMutation({
    fixedCacheKey: "sent-text",
  });
  const navigate = useNavigate();

  const getAddress = () => {
    if (fridges && fridge !== undefined && fridges[fridge].location) {
      return `, at ${fridges[fridge].location},`;
    } else {
      return "";
    }
  };

  const getDietaryInfo = () => {
    if (dietary) {
      return `This meal is ${dietary}. `;
    } else {
      return "";
    }
  };

  const message =
    fridge !== undefined
      ? `Hello! ${
          !!fridges && fridges[fridge].name
        } Town Fridge${getAddress()} has been stocked with ${mealCount} meals on ${format(
          new Date(`${date} ${time}`),
          "M/d 'at' h:mm a"
        )}, made with love by ${source}! Please take only what you need, and leave the rest to share. The meal today is ${name}. ${getDietaryInfo()}Please respond to this message with any feedback. Enjoy!`
      : undefined;

  const renderPhoto = () => {
    if (imageError) {
      return (
        <div className="send-text-small-photo">
          <div className="send-text-photo-error">
            Photo URL is not a valid image
          </div>
        </div>
      );
    }
    if (photo) {
      let src = "";
      if (typeof photo === "string") {
        src = photo;
      } else {
        src = URL.createObjectURL(photo);
      }
      return (
        <div className="send-text-small-photo">
          <img onError={() => setImageError(true)} src={src} alt="meal" />
        </div>
      );
    }
  };

  const composeText = () => {
    const btnActive =
      fridge !== undefined &&
      date &&
      (message || photo) &&
      time &&
      source &&
      name &&
      mealCount > 0 &&
      !(photo && imageError);

    return (
      <div className="send-text">
        <div className="send-text-variables">
          <div className="send-text-variables-item">
            <label htmlFor="date">Date:</label>
            <input
              required
              name="date"
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="time">Time:</label>
            <input
              className="send-text-time"
              required
              name="time"
              type="time"
              onChange={(e) => setTime(e.target.value)}
              value={time}
            />
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="fridge">Town Fridge Location:</label>
            <select
              required
              name="fridge"
              value={fridge}
              onChange={(e) => setFridge(parseInt(e.target.value))}
            >
              <option value="">Select a Town Fridge</option>
              {fridges?.map((f, i) => (
                <option value={i} key={f.name}>
                  {f.name}
                </option>
              ))}
            </select>
            <div className="fridge">
              {fridge !== undefined && fridges && (
                <div className="fridge-info">
                  <div className="fridge-info-label">Address: </div>
                  {fridges[fridge].location}
                </div>
              )}

              {fridge !== undefined && fridges && (
                <div className="fridge-info">
                  <div className="fridge-info-label">Region: </div>
                  {fridges[fridge].region}
                </div>
              )}
            </div>
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="name">Name of Meal:</label>
            <textarea
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="mealCount">Number of Meals:</label>
            <input
              type="number"
              value={mealCount}
              name="mealCount"
              onChange={(e) => setMealCount(parseInt(e.target.value))}
              min={1}
            />
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="source">Prepared By:</label>
            <textarea
              value={source}
              name="source"
              onChange={(e) => setSource(e.target.value)}
            />
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="dietary">Dietary Information (optional):</label>
            <textarea
              value={dietary}
              name="dietary"
              onChange={(e) => setDietary(e.target.value)}
            />
          </div>

          <div className="send-text-variables-item">
            <label>Photo (Optional):</label>
            <div className="send-text-photo-field-container">
              <FileInput
                file={typeof photo === "string" ? undefined : photo}
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
                value={!photo ? "" : photo instanceof File ? "" : photo}
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
          {renderPhoto()}
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
    if (!fridges || fridge === undefined) {
      return <div>Reload the page.</div>;
    }
    const reg = fridges[fridge]?.region;
    if (reg) {
      return renderWithFallback(
        <TextPreview
          message={message}
          region={reg}
          photo={photo}
          onSubmit={async () => {
            if (reg !== "CK Kitchen") {
              await sendText({
                message,
                region: reg,
                photo,
              }).unwrap();
              navigate("../text-success");
            }
          }}
          onCancel={() => setPreview(false)}
        />
      );
    }
  };

  return (
    <div>
      <h2>Send a Text</h2>
      {renderContent()}
    </div>
  );
};

export default SendText;
