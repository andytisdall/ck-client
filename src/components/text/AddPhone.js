import { useState } from 'react';
import { connect } from 'react-redux';

import { addPhone } from '../../actions';
import { REGIONS } from './townFridges';
import './AddPhone.css';

const AddPhone = ({ addPhone, alert }) => {
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState(REGIONS.EAST_OAKLAND);

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
      <form onSubmit={submitPhone} className="add-phone">
        <div className="add-phone-item">
          <label htmlFor="phone">Phone Number:</label>
          <input
            name="phone"
            className="input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="add-phone-item">
          <label htmlFor="region">Region:</label>
          <select
            name="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value={REGIONS.EAST_OAKLAND}>East Oakland</option>
            <option value={REGIONS.WEST_OAKLAND}>West Oakland</option>
          </select>
        </div>
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
