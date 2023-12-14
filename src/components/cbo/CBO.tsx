import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  Title,
  LinearScale,
  ChartOptions,
} from 'chart.js';
import { useState, useMemo, useRef } from 'react';
import { format, lastDayOfMonth } from 'date-fns';

import { useGetCBOReportsQuery, CBOReport } from '../../state/apis/cboApi';
import Ages from './Ages';
import Races from './Race';
import PerformanceMeasures from './PerformanceMeasures';
import ZipCodes from './ZipCodes';
import Loading from '../reusable/loading/Loading';
import Households from './Households';
import { filterByDate } from './reportMethods';
import { useGetUserQuery } from '../../state/apis/authApi';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale
);

export type CBOReportProps = { reports: CBOReport[] };

export const defaultOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const CBO = () => {
  const [filterOn, setFilterOn] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data: reports, isLoading: reportsIsLoading } =
    useGetCBOReportsQuery();
  const { data: user, isLoading: userIsLoading } = useGetUserQuery();

  const monthHighlightRef = useRef(false);
  const monthPickerRef = useRef<HTMLSelectElement>(null);

  const monthOptions = useMemo(() => {
    if (reports) {
      const months: string[] = [];
      reports.forEach((rep) => {
        const date = `${rep.month} ${rep.year}`;
        if (!months.includes(date)) {
          months.push(date);
        }
      });
      return months.sort((a, b) => (new Date(a) > new Date(b) ? 1 : -1));
    }
  }, [reports]);

  const filteredReports = useMemo(() => {
    if (reports) {
      if (filterOn) {
        return filterByDate(startDate, endDate, reports);
      }
      return reports;
    }
  }, [reports, filterOn, startDate, endDate]);

  const renderDateSelect = () => {
    if (filterOn) {
      const datePickerStyle = monthHighlightRef.current
        ? ''
        : 'cbo-input-selected';
      const monthPickerStyle = monthHighlightRef.current
        ? 'cbo-input-selected'
        : '';

      return (
        <div className="cbo-date-input-row">
          <div className={`cbo-date-input-section ${datePickerStyle}`}>
            <input
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                monthHighlightRef.current = false;
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
                monthHighlightRef.current = false;
                if (monthPickerRef.current) {
                  monthPickerRef.current.value = '';
                }
              }}
              className="cbo-date-input"
            />
          </div>
          <p>Or</p>
          <div className={`cbo-date-input-section ${monthPickerStyle}`}>
            <select
              ref={monthPickerRef}
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
                  monthHighlightRef.current = true;
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

  const dateFilter = () => {
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
      </div>
    );
  };

  const renderInfo = () => {
    return (
      <div className="cbo-date-range-display">
        <p>
          Date Range:{' '}
          <span className="cbo-date-bold">
            {!filterOn
              ? 'All Time'
              : startDate && endDate
              ? `${format(new Date(startDate), 'M/d/yy')} - ${format(
                  new Date(endDate),
                  'M/d/yy'
                )}`
              : '-'}
          </span>
        </p>
        <p>
          Number of reports being used:{' '}
          <span className="cbo-date-bold">{filteredReports?.length}</span>
        </p>
      </div>
    );
  };

  if (reportsIsLoading || userIsLoading) {
    return (
      <div className="cbo main">
        <Loading />
      </div>
    );
  }

  if (!user?.admin) {
    return (
      <div className="cbo main">
        <h3>User is not authorized.</h3>
      </div>
    );
  }

  if (filteredReports) {
    return (
      <div className="cbo main">
        <h1>CBO Report Data</h1>
        {dateFilter()}
        {renderInfo()}
        <Ages reports={filteredReports} />
        <Races reports={filteredReports} />
        <PerformanceMeasures reports={filteredReports} />
        <ZipCodes reports={filteredReports} />
        <Households reports={filteredReports} />
      </div>
    );
  }
  return <div className="cbo main">No Data Found</div>;
};

export default CBO;
