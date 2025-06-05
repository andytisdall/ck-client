import UploadPhoto from "./UploadPhoto";
import { useUploadLicenseMutation } from "../../../state/apis/volunteerApi/driver";

const License = () => {
  const [uploadLicense, { isLoading }] = useUploadLicenseMutation();

  return (
    <UploadPhoto
      upload={uploadLicense}
      isLoading={isLoading}
      label="Driver's License"
      doc="DL"
      dateLabel="Driver's License Expiration Date:"
    />
  );
};

export default License;
