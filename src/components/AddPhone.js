import { useState } from 'react';
import server from '../api';

const AddPhone = ({ setError }) => {
  const [phone, setPhone] = useState('');

  const submitPhone = async (e) => {
    e.preventDefault();
    try {
      const res = await server.post('/addphone', { phone });
      console.log('Added phone number: ' + res.data.number);
    } catch (err) {
      setError(err.response?.data || 'Add phone did not work');
    }
  };

  return (
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
  );
};

export default AddPhone;
