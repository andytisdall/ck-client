import { connect } from 'react-redux';
import { useState } from 'react';

import * as actions from '../../../actions';
import useLoading from '../../../hooks/useLoading';
import Loading from '../../reusable/loading/Loading';

const SearchPhone = ({ getPhoneNumber }) => {
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useLoading();

  return (
    <form
      className="phone-form"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        getPhoneNumber(number);
      }}
    >
      <label>Find a number to remove:</label>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      {!loading ? <input type="submit" /> : <Loading />}
    </form>
  );
};

export default connect(null, actions)(SearchPhone);
