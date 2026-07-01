import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./Form.css";
import Loading from "../reusable/loading/Loading";

const FormSent = () => {
  const {
    state,
  }: { state?: { title?: string; message?: string; redirect?: string } } =
    useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (state?.redirect) {
      const timeout = process.env.NODE_ENV === "production" ? 5000 : 10;

      setTimeout(() => {
        navigate(state.redirect!);
      }, timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderMessage = () => {
    if (state?.message) {
      return <p>{state.message}</p>;
    }
  };

  const renderTitle = () => {
    return state?.title || "Your Submission Was Successful!";
  };

  return (
    <div className="form-background form-sent">
      <div className="form">
        <div className="form-item">
          <h1>{renderTitle()}</h1>
          {renderMessage()}
          {state?.redirect ? (
            <Loading />
          ) : (
            <div className="form-link">
              <a href="https://ckoakland.org">
                <button>Go Back to the CK Home Page</button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormSent;
