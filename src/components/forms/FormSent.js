import { connect } from 'react-redux';

const FormSent = ({ successMessage }) => {
  return (
    <div className="interest-form-background form-sent">
      <div className="interest-form">
        <div className="interest-form-item">
          <h1>Your Submission Was Successful!</h1>
          <p>{successMessage}</p>
          <a href="https://ckoakland.org">
            <button>Go Back to the CK Home Page</button>
          </a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { successMessage: state.forms.successMessage };
};

export default connect(mapStateToProps)(FormSent);
