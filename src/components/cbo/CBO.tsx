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
import { useState, useMemo } from 'react';

import { useGetCBOReportsQuery, CBOReport } from '../../state/apis/cboApi';
import Ages from './Ages';
import Races from './Race';
import PerformanceMeasures from './PerformanceMeasures';
import ZipCodes from './ZipCodes';
import Loading from '../reusable/loading/Loading';
import Households from './Households';
import { filterByDate } from './reportMethods';
import { useGetUserQuery } from '../../state/apis/authApi';
import DateFilter from './DateFilter';

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
  const [oasisOnly, setOasisOnly] = useState(false);

  const { data: reports, isLoading: reportsIsLoading } =
    useGetCBOReportsQuery();
  const { data: user, isLoading: userIsLoading } = useGetUserQuery();

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
    return [];
  }, [reports]);

  const filteredReports = useMemo(() => {
    if (reports) {
      let tempReports = reports;
      if (filterOn) {
        tempReports = filterByDate(startDate, endDate, tempReports);
      }
      if (oasisOnly) {
        tempReports = tempReports.filter(
          (rep) => rep.cboId === '0018Z000036rH4rQAE'
        );
      }
      return tempReports;
    }
  }, [reports, filterOn, startDate, endDate, oasisOnly]);

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

  const renderOasisCheckbox = () => {
    return (
      <div>
        <input
          id="oasis-only"
          type="checkbox"
          checked={oasisOnly}
          onChange={(e) => {
            if (e.target.checked) {
              setOasisOnly(true);
            } else {
              setOasisOnly(false);
            }
          }}
        />
        <label htmlFor="oasis-only">Mobile Oasis Only</label>
      </div>
    );
  };

  if (filteredReports) {
    return (
      <div className="cbo main">
        <h1>CBO Report Data</h1>
        <DateFilter
          numberOfReports={filteredReports.length}
          monthOptions={monthOptions}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          filterOn={filterOn}
          setFilterOn={setFilterOn}
          startDate={startDate}
          endDate={endDate}
        />
        {renderOasisCheckbox()}
        <Ages reports={filteredReports} />
        <Races reports={filteredReports} />
        <PerformanceMeasures reports={filteredReports} />
        <ZipCodes reports={filteredReports} />
        <Households reports={filteredReports} />
      </div>
    );
  }
  return <div className="cbo main">No Data Found. Try refreshing.</div>;
};

export default CBO;
