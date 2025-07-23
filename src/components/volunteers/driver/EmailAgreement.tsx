import { Link } from "react-router-dom";

import { useRequestAgreementQuery } from "../../../state/apis/signApi";

const EmailAgreement = () => {
  useRequestAgreementQuery("CK Volunteer");

  return (
    <div>
      <h3>The CK Volunteer Agreement will be emailed to you shortly.</h3>
      <Link to="..">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default EmailAgreement;
