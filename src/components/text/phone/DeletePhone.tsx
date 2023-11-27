import { useState } from 'react';
import { useDispatch } from 'react-redux';

import SearchPhone from './SearchPhone';
import Loading from '../../reusable/loading/Loading';
import {
  useDeletePhoneMutation,
  GetPhoneNumberResponse,
} from '../../../state/apis/textApi';
import { setAlert } from '../../../state/apis/slices/alertSlice';

const DeletePhone = () => {
  const [number, setNumber] = useState<GetPhoneNumberResponse>();
  const [deletePhone, deletePhoneResult] = useDeletePhoneMutation();

  const dispatch = useDispatch();

  const renderDelete = () => {
    if (number) {
      return (
        <div>
          <h4>{number.number.substring(2)}</h4>
          {!deletePhoneResult.isLoading ? (
            <>
              <button
                onClick={() => {
                  deletePhone(number.id)
                    .unwrap()
                    .then(() => {
                      setNumber(undefined);
                      dispatch(setAlert('Number has been removed'));
                    });
                }}
                className="cancel"
              >
                Delete this Number
              </button>
              <button onClick={() => setNumber(undefined)}>Cancel</button>{' '}
            </>
          ) : (
            <Loading />
          )}
        </div>
      );
    } else {
      return <SearchPhone setSearchResult={setNumber} />;
    }
  };
  return (
    <div className="phone-item delete-phone">
      <h2>Remove a phone number</h2>
      {renderDelete()}
    </div>
  );
};

export default DeletePhone;
