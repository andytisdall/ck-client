import { Link, useParams } from "react-router-dom";

import { useGetSigningUrlQuery } from "../../../state/apis/signApi";
import Loading from "../loading/Loading";

const Sign = () => {
  const { doc, contactId, hoursId } = useParams();
  const { data, isLoading, isError } = useGetSigningUrlQuery({
    doc,
    contactId,
    hoursId,
  });

  if (data) {
    if (data.signingUrl) {
      window.location.href = data.signingUrl;
    } else {
      return (
        <div>
          <p>You have already signed this document.</p>
          <Link to="../..">
            <button>Back</button>
          </Link>
        </div>
      );
    }
  }

  if (isError) {
    <div>
      <h2>Unable to connect to e-sign service.</h2>
    </div>;
  }

  return (
    <div>
      <h2>Please Sign the CK Volunteer Agreement</h2>
      <p>You will be redirected to sign.</p>
      {isLoading && <Loading />}
    </div>
  );
};

export default Sign;
