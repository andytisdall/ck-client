import { useState } from 'react';
import { connect } from 'react-redux';

import { addPhone } from '../../actions';

const AddPhone = ({ addPhone, alert }) => {
  const [phone, setPhone] = useState('');

  const submitPhone = async (e) => {
    e.preventDefault();
    addPhone(phone);
    setPhone('');
  };

  const renderSuccess = () => {
    return <div className="sent-success">{alert}</div>;
  };

  return (
    <div>
      <h2>Add a phone number</h2>
      <form onSubmit={submitPhone}>
        <label htmlFor="phone">Phone Number:</label>
        <input
          name="phone"
          className="input"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input type="submit" />
      </form>
      {alert && renderSuccess()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { alert: state.alert.message };
};

export default connect(mapStateToProps, { addPhone })(AddPhone);
