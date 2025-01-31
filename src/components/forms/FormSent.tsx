import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './Form.css';
import Loading from '../reusable/loading/Loading';

const FormSent = () => {
  const { state }: { state?: { message?: string; reload?: boolean } } =
    useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (state?.reload) {
      setTimeout(() => {
        navigate(-1);
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderMessage = () => {
    if (state?.message) {
      return <p>{state.message}</p>;
    }
  };

  return (
    <div className="form-background form-sent">
      <div className="form">
        <div className="form-item">
          <h1>Your Submission Was Successful!</h1>
          {renderMessage()}
          {state?.reload ? (
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
