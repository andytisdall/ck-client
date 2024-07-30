import { useState } from 'react';
import { format } from 'date-fns-tz';

import './TextRecords.css';
import Loading from '../../reusable/loading/Loading';
import { useGetAllUsersQuery } from '../../../state/apis/authApi';
import { useGetTextRecordsQuery } from '../../../state/apis/textApi';

const regions = { WEST_OAKLAND: 'West Oakland', EAST_OAKLAND: 'East Oakland' };

const TextRecords = () => {
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [userId, setUserId] = useState('');

  const users = useGetAllUsersQuery().data;
  const textRecords = useGetTextRecordsQuery({
    startDate: startDate.toString(),
  }).data;

  const renderTextRecords = () => {
    if (!textRecords || !users) {
      return <Loading />;
    }
    if (!textRecords?.length) {
      return <div>No outgoing texts found for the specified start date.</div>;
    }
    return textRecords
      .filter((rec) => {
        if (userId) {
          return rec.sender === userId;
        }
        return true;
      })
      .map((rec) => {
        return (
          <div key={rec.id} className="text-record">
            <div className="text-record-header">
              <div>{format(new Date(rec.date), 'eee M-d-yy h:mm a')}</div>
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
              <a href={rec.image} target="blank">
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
      {users && (
        <select onChange={(e) => setUserId(e.target.value)}>
          <option value="">All Users</option>
          {Object.values(users).map((user) => (
            <option value={user.id}>{user.username}</option>
          ))}
        </select>
      )}
      {renderTextRecords()}
    </div>
  );
};

export default TextRecords;
