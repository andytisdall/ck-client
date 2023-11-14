import { useState } from 'react';

import { Region, useAddPhoneMutation } from '../../../state/apis/textApi';
import Loading from '../../reusable/loading/Loading';

const AddPhone = () => {
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState<Region>('EAST_OAKLAND');

  const [addPhone, addPhoneResult] = useAddPhoneMutation();

  const submitPhone: React.FormEventHandler = async (e) => {
    e.preventDefault();
    addPhone({ phone, region });
  };

  return (
    <div className="phone-item add-phone">
      <h2>Add a phone number</h2>
      <form onSubmit={submitPhone} className="phone-form">
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
          onChange={(e) => setRegion(e.target.value as Region)}
        >
          <option value={'EAST_OAKLAND'}>East Oakland</option>
          <option value={'WEST_OAKLAND'}>West Oakland</option>
        </select>
        {addPhoneResult.isLoading ? (
          <Loading />
        ) : (
          <input type="submit" value="Submit" />
        )}
      </form>
    </div>
  );
};

export default AddPhone;
