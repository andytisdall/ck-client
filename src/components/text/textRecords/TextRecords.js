import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { format } from 'date-fns-tz';

import './TextRecords.css';
import * as actions from '../../../actions';
import Loading from '../../reusable/loading/Loading';

const regions = { WEST_OAKLAND: 'West Oakland', EAST_OAKLAND: 'East Oakland' };

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
            <div>
              {format(new Date(rec.date), 'eee M-d-yy h:mm a')}
              {/* {rec.date} */}
            </div>
            <div>
              Sent by:{' '}
              {rec.sender === 'salesforce'
                ? 'Salesforce'
                : users[rec.sender]?.username}
            </div>
            <div>To: {regions[rec.region] || rec.region}</div>
          </div>
          <div>{rec.message}</div>
          {!!rec.image && (
            <a href={rec.image} alt="attached" target="blank">
              <button>View Image</button>
            </a>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      <input
        type="date"
        value={startDate}
        onChange={(e) =>
          setStartDate(format(new Date(e.target.value), 'yyyy-MM-dd'))
        }
      />
      {renderTextRecords()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { textRecords: state.text.textRecords, users: state.user.users };
};

export default connect(mapStateToProps, actions)(TextRecords);
