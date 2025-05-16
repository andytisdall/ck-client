import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { optimisticallyUpdateHomeChefAgreement } from "../../../state/apis/authApi";
import Loading from "../loading/Loading";
import { optimisticallyUpdateDriverStatus } from "../../../state/apis/volunteerApi/driver";

const SignSuccess = ({ returnLink }: { returnLink?: string }) => {
  const { contactId, hoursId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    setTimeout(() => {
      if (returnLink) {
        dispatch(optimisticallyUpdateHomeChefAgreement);
        dispatch(optimisticallyUpdateDriverStatus);
      } else {
        navigate(`../../confirm/${contactId}/${hoursId}`);
      }
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>Signing Completed</h3>
      {!returnLink && <Loading />}
      {!!returnLink && (
        <Link to={returnLink}>
          <button>Continue</button>
        </Link>
      )}
    </div>
  );
};

export default SignSuccess;
