import UploadPhoto from "./UploadPhoto";
import { useUploadInsuranceMutation } from "../../../state/apis/volunteerApi/driver";

const Insurance = () => {
  const [uploadInsurance, { isLoading }] = useUploadInsuranceMutation();

  return (
    <UploadPhoto
      label="Proof of Insurance"
      isLoading={isLoading}
      upload={uploadInsurance}
      dateLabel="Insurance Expiration Date:"
    />
  );
};

export default Insurance;
