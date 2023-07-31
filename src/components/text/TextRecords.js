import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { format } from 'date-fns-tz';

import './TextRecords.css';
import * as actions from '../../actions';
import Loading from '../reusable/Loading';

const TextRecords = ({ textRecords, getTextRecords, getAllUsers, users }) => {
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    if (startDate) {
      getTextRecords(startDate);
    }
  }, [getTextRecords, startDate]);

  const renderTextRecords = () => {
    if (!textRecords) {
      return <Loading />;
    }
    if (!textRecords.length) {
      return <div>No outgoing texts found for the specified start date.</div>;
    }
    return textRecords.map((rec) => {
      return (
        <div key={rec.id} className="text-record">
          <div className="text-record-header">
            <div>{format(new Date(rec.date), 'MM-dd-yy, hh:mm a')}</div>
            <div>
              {rec.sender === 'salesforce'
                ? 'Salesforce'
                : users[rec.sender]?.username}
            </div>
            <div>{rec.region}</div>
          </div>
          <div>{rec.message}</div>
          {!!rec.image && <div>{rec.image}</div>}
        </div>
      );
    });
  };

  return (
    <div>
      <input type="date" value={startDate} onChange={setStartDate} />
      {renderTextRecords()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { textRecords: state.text.textRecords, users: state.user.users };
};

export default connect(mapStateToProps, actions)(TextRecords);
