import { format, lastDayOfMonth } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { useState } from 'react';

const DateFilter = ({
  filterOn,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  numberOfReports,
  setFilterOn,
  monthOptions,
}: {
  filterOn: boolean;
  setFilterOn: (state: boolean) => void;
  numberOfReports: number;
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  monthOptions: string[];
}) => {
  const [monthPickerActive, setMonthPickerActive] = useState(false);

  const renderDateInfo = () => {
    return (
      <div className="cbo-date-range-display">
        <p>
          Date Range:{' '}
          <span className="cbo-date-bold">
            {!filterOn
              ? 'All Time'
              : startDate && endDate
              ? `${format(
                  utcToZonedTime(startDate, 'America/Los_Angeles'),
                  'M/d/yy'
                )} - ${format(
                  utcToZonedTime(endDate, 'America/Los_Angeles'),
                  'M/d/yy'
                )}`
              : '-'}
          </span>
        </p>
        <p>
          Number of reports being used:{' '}
          <span className="cbo-date-bold">{numberOfReports}</span>
        </p>
      </div>
    );
  };

  const renderDateSelect = () => {
    if (filterOn) {
      const datePickerStyle = monthPickerActive ? '' : 'cbo-input-selected';
      const monthPickerStyle = monthPickerActive ? 'cbo-input-selected' : '';

      return (
        <div className="cbo-date-input-row">
          <div className={`cbo-date-input-section ${datePickerStyle}`}>
            <input
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setMonthPickerActive(false);
              }}
              type="date"
              className="cbo-date-input"
            />
            <p>to</p>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setMonthPickerActive(false);
              }}
              className="cbo-date-input"
            />
          </div>
          <p>Or</p>
          <div className={`cbo-date-input-section ${monthPickerStyle}`}>
            <select
              className="cbo-month-select"
              onChange={(e) => {
                const monthYear = e.target.value;
                if (monthYear) {
                  const monthStartDate = format(
                    new Date(monthYear),
                    'yyyy-MM-dd'
                  );
                  const monthEndDate = format(
                    lastDayOfMonth(new Date(monthYear)),
                    'yyyy-MM-dd'
                  );
                  setStartDate(monthStartDate);
                  setEndDate(monthEndDate);
                  setMonthPickerActive(true);
                }
              }}
            >
              <option value="">select month</option>
              {monthOptions?.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="cbo-date-filter">
      <div className="cbo-date-filter-item">
        <input
          type="radio"
          name="date"
          onChange={(e) => {
            if (e.target.checked) {
              setFilterOn(false);
            }
          }}
          checked={!filterOn}
          id="all-time"
        />
        <label htmlFor="all-time">All Time</label>
      </div>
      <div className="cbo-date-filter-item">
        <input
          id="date"
          type="radio"
          name="date"
          onChange={(e) => {
            if (e.target.checked) {
              setFilterOn(true);
            }
          }}
        />
        <label htmlFor="date">Filter by Date</label>
      </div>
      {renderDateSelect()}
      {renderDateInfo()}
    </div>
  );
};

export default DateFilter;
