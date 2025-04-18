import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { optimisticallyUpdateVolunteerAgreement } from "../../../state/apis/authApi";
import Loading from "../loading/Loading";

// const KITCHEN_RETURN_LINK = '/volunteers/ck-kitchen/signup/';
// const KITCHEN_RETURN_LINK = "../confirm";

const SignSuccess = ({ returnLink }: { returnLink?: string }) => {
  const { contactId, hoursId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    if (returnLink) {
      dispatch(optimisticallyUpdateVolunteerAgreement);
    } else {
      setTimeout(() => {
        navigate(`../../confirm/${contactId}/${hoursId}`);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>Signing Completed</h3>
      <Loading />
      {!!returnLink && (
        <Link to={returnLink}>
          <button>Continue</button>
        </Link>
      )}
    </div>
  );
};

export default SignSuccess;
