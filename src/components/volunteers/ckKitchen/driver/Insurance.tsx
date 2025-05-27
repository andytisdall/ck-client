import { useNavigate } from "react-router-dom";

import FileUpload from "../../../reusable/file/FileUpload";
import { useUploadInsuranceMutation } from "../../../../state/apis/volunteerApi/driver";
import Loading from "../../../reusable/loading/Loading";
import { FormEventHandler } from "react";

const Insurance = () => {
  const [uploadInsurance, { isLoading }] = useUploadInsuranceMutation();

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
    await uploadInsurance(formData).unwrap();
    navigate("..");
  };
  return (
    <div>
      <h3>Upload Driver's License</h3>
      <form className="driver-license-form" onSubmit={onSubmit}>
        <FileUpload label="Proof of Insurance" doc="INS" />
        <label>Insurance Expiration Date:</label>
        <input type="date" required name="expirationDate" />
        {isLoading ? <Loading /> : <input type="submit" />}
      </form>
      <button onClick={() => navigate("..")}>Back</button>
    </div>
  );
};

export default Insurance;
