import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const ShiftSignupForm = ({ shifts }) => {
  const { shiftId } = useParams();
  const shift = shifts[shiftId];

  return (
    <div>
      <h3>Sign Up for this Shift</h3>
      <h4>{shift.GW_Volunteers__Shift_Start_Date_Time__c}</h4>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { shifts: state.homeChef.shifts };
};

export default connect(mapStateToProps, {})(ShiftSignupForm);
