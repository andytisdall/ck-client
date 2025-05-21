import { FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";

import "./Orientation.css";
import FileUpload from "../../reusable/file/FileUpload";
import Loading from "../../reusable/loading/Loading";
import { FOOD_HANDLER_URL } from "./HomeChefOnboarding";
import { useUploadFoodHandlerCertificateMutation } from "../../../state/apis/volunteerApi/homeChefApi";

const UploadFoodHandler = () => {
  const [uploadFiles, { isLoading }] =
    useUploadFoodHandlerCertificateMutation();

  const navigate = useNavigate();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Array.from(e.currentTarget.elements).forEach((input) => {
      if (input instanceof HTMLInputElement && input.files?.length) {
        formData.append(input.name, input.files[0]);
      }
    });

    if (Array.from(formData).length) {
      await uploadFiles(formData).unwrap();
      navigate("../file-success/");
    }
  };

  return (
    <div>
      <h1>Upload your food handler certificate</h1>
      <p className="food-handler">
        Don't have your food handler certificate yet?{" "}
        <a className="retro-link" href={FOOD_HANDLER_URL}>
          Click here to apply.
        </a>
      </p>
      <form onSubmit={onSubmit}>
        <FileUpload label="Food Handler Certification" doc="FH" />
        {isLoading ? <Loading /> : <input type="submit" value="Submit" />}
      </form>
    </div>
  );
};

export default UploadFoodHandler;
