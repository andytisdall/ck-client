import { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import './OldShiftSignUp.css';

const SALESFORCE_BASE_URL = 'https://communitykitchens.my.salesforce-sites.com';

const ShiftSignUp = ({ user }) => {
  const iframe = useRef();

  useEffect(() => {
    iframe.current.contentWindow.andy = 'a';
  }, [iframe]);

  return (
    <div className="shift-signup">
      <h2>Sign Up for Home Chef Shifts</h2>

      <iframe
        title="salesforce-iframe"
        src={SALESFORCE_BASE_URL + '/GW_Volunteers__JobCalendar'}
        ref={iframe}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps)(ShiftSignUp);
