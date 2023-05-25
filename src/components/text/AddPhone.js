import { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import './AddPhone.css';
import useLoading from '../../hooks/useLoading';
import Loading from '../reusable/Loading';

const AddPhone = ({ addPhone }) => {
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('EAST_OAKLAND');
  const [loading, setLoading] = useLoading();

  const submitPhone = async (e) => {
    e.preventDefault();
    setLoading(true);
    addPhone(phone, region);
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
            <option value={'EAST_OAKLAND'}>East Oakland</option>
            <option value={'WEST_OAKLAND'}>West Oakland</option>
          </select>
        </div>
        {loading ? <Loading /> : <input type="submit" value="Submit" />}
      </form>
    </div>
  );
};

export default connect(null, actions)(AddPhone);
