import { useEffect } from 'react';

const FormSent = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <div className="interest-form-background form-sent">
      <div className="interest-form">
        <div className="interest-form-item">
          <h1>Your Submission Was Successful!</h1>
          <a href="https://ckoakland.org">
            <button>Go Back to the CK Home Page</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FormSent;
