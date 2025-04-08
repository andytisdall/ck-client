import { useState } from 'react';

import Loading from '../../reusable/loading/Loading';
import {
  useLazyGetPhoneNumberQuery,
  GetPhoneNumberResponse,
} from '../../../state/apis/textApi';

const SearchPhone = ({
  setSearchResult,
}: {
  setSearchResult: React.Dispatch<
    React.SetStateAction<GetPhoneNumberResponse | undefined>
  >;
}) => {
  const [number, setNumber] = useState('');
  const [notFound, setNotFound] = useState(false);

  const [getPhoneNumber, getPhoneNumberResult] = useLazyGetPhoneNumberQuery();

  return (
    <form
      className="phone-form"
      onSubmit={(e) => {
        e.preventDefault();
        getPhoneNumber(number).then(({ data }) => {
          if (data) {
            setSearchResult(data);
            setNumber('');
          } else {
            setNotFound(true);
          }
        });
      }}
    >
      <label>Find a number to remove:</label>
      <input
        type="text"
        value={number}
        onChange={(e) => {
          if (notFound) {
            setNotFound(false);
          }
          setNumber(e.target.value);
        }}
      />
      {!getPhoneNumberResult.isLoading ? <input type="submit" /> : <Loading />}
      {notFound && <p>Phone Number Not Found.</p>}
    </form>
  );
};

export default SearchPhone;
