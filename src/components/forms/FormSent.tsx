import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './Form.css';

const FormSent = () => {
  const { state } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const renderMessage = () => {
    if (state.message) {
      return <p>{state.message}</p>;
    }
  };

  return (
    <div className="form-background form-sent">
      <div className="form">
        <div className="form-item">
          <h1>Your Submission Was Successful!</h1>
          {renderMessage()}
          <div className="form-link">
            <a href="https://ckoakland.org">
              <button>Go Back to the CK Home Page</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSent;
