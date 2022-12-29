import { useState } from 'react';
import { connect } from 'react-redux';

import { addPhone } from '../../actions';
import { REGION_CODES } from './regionCodes';

const AddPhone = ({ addPhone, alert }) => {
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState(REGION_CODES.EAST_OAKLAND);

  const submitPhone = async (e) => {
    e.preventDefault();
    addPhone(phone, region);
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
        <label htmlFor="region">Region:</label>
        <select
          name="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value={REGION_CODES.EAST_OAKLAND}>East Oakland</option>
          <option value={REGION_CODES.WEST_OAKLAND}>West Oakland</option>
        </select>
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
