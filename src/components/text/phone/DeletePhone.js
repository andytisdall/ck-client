import { connect } from 'react-redux';
import { useEffect } from 'react';

import * as actions from '../../../actions';
import SearchPhone from './SearchPhone';
import useLoading from '../../../hooks/useLoading';
import Loading from '../../reusable/loading/Loading';

const DeletePhone = ({ number, deletePhone, clearNumber }) => {
  const [loading, setLoading] = useLoading();

  useEffect(
    () => () => {
      clearNumber();
    },
    [clearNumber]
  );

  const renderDelete = () => {
    if (number) {
      return (
        <div>
          <h4>{number.number.substring(2)}</h4>
          {!loading ? (
            <>
              <button
                onClick={() => {
                  setLoading(true);
                  deletePhone(number.id).then(() => setLoading(false));
                }}
                className="cancel"
              >
                Delete this Number
              </button>
              <button onClick={clearNumber}>Cancel</button>{' '}
            </>
          ) : (
            <Loading />
          )}
        </div>
      );
    } else {
      return <SearchPhone />;
    }
  };
  return (
    <div className="phone-item delete-phone">
      <h2>Remove a phone number</h2>
      {renderDelete()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { number: state.text.number };
};

export default connect(mapStateToProps, actions)(DeletePhone);
