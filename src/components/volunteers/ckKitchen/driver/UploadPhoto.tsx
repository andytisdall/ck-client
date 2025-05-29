import { useNavigate } from "react-router-dom";
import { FormEventHandler } from "react";

import Loading from "../../../reusable/loading/Loading";
import FileUpload from "../../../reusable/file/FileUpload";

const UploadPhoto = ({
  upload,
  isLoading,
  doc,
  label,
  dateLabel,
}: {
  upload: (data: FormData) => { unwrap: () => Promise<null> };
  isLoading: boolean;
  doc: string;
  label: string;
  dateLabel: string;
}) => {
  const navigate = useNavigate();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Array.from(e.currentTarget.elements).forEach((input) => {
      if (input instanceof HTMLInputElement) {
        if (input.files?.length) {
          formData.append(input.name, input.files[0]);
        } else {
          formData.append(input.name, input.value);
        }
      }
    });
    await upload(formData).unwrap();
    navigate("..");
  };
  return (
    <div>
      <h3>Upload {label}</h3>
      <form className="driver-license-form" onSubmit={onSubmit}>
        <FileUpload label={label} doc={doc} />
        <div className="driver-date-input">
          <label htmlFor="date">{dateLabel}</label>
          <input type="date" id="date" required name="expirationDate" />
        </div>
        <div className="driver-btns">
          {isLoading ? <Loading /> : <input type="submit" />}
          <button className="cancel" onClick={() => navigate("..")}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPhoto;
