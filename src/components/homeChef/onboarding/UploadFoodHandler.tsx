import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Orientation.css";
import FileInput from "../../reusable/file/FileInput";
import Loading from "../../reusable/loading/Loading";
import { FOOD_HANDLER_URL } from "./HomeChefOnboarding";
import { useUploadFoodHandlerCertificateMutation } from "../../../state/apis/volunteerApi/homeChefApi";

const UploadFoodHandler = () => {
  const [uploadFiles, { isLoading }] =
    useUploadFoodHandlerCertificateMutation();
  const [file, setFile] = useState<File>();

  const navigate = useNavigate();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (file) {
      await uploadFiles(file).unwrap();
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
        <FileInput
          label="Food Handler Certification"
          file={file}
          setFile={setFile}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <input
            type="submit"
            value="Submit"
            className={file ? "" : "btn-inactive"}
          />
        )}
      </form>
    </div>
  );
};

export default UploadFoodHandler;
