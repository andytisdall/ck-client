import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import Loading from "../../reusable/loading/Loading";
import FileInput from "../../reusable/file/FileInput";
import { UploadDocArgs } from "../../../state/apis/volunteerApi/driver";

const UploadPhoto = ({
  upload,
  isLoading,
  doc,
  label,
  dateLabel,
}: {
  upload: (data: UploadDocArgs) => { unwrap: () => Promise<null> };
  isLoading: boolean;
  doc: string;
  label: string;
  dateLabel: string;
}) => {
  const [file, setFile] = useState<File>();
  const [date, setDate] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();

  const infoComplete = file && date;

  const onSubmit = async () => {
    const dateIsValid = date && new Date(date) > new Date();

    if (!file) {
      return setErrorMessage("Please attach a photo of your document");
    }
    if (!dateIsValid) {
      return setErrorMessage("The expiration date must be in the future");
    }
    setErrorMessage(undefined);
    await upload({ file, date }).unwrap();
    navigate("..");
  };

  return (
    <div>
      <h3>Upload {label}</h3>
      <form
        className="driver-license-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <FileInput file={file} setFile={setFile} label={label} />
        <div className="driver-date-input">
          <label htmlFor="date">{dateLabel}</label>
          <input
            type="date"
            id="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="driver-btns">
            <button
              onClick={onSubmit}
              className={infoComplete ? "" : "btn-inactive"}
            >
              Submit
            </button>
            <button className="cancel" onClick={() => navigate("..")}>
              Back
            </button>
          </div>
        )}
        {errorMessage && (
          <div className="driver-file-error">{errorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default UploadPhoto;
