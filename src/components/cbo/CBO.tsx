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
import { useState } from 'react';

import Ages from './Ages';
import Races from './Race';
import PerformanceMeasures from './PerformanceMeasures';
import ZipCodes from './ZipCodes';
import { CBOReport } from '../../state/apis/cboApi';

export type CBOReportProps = {
  startDate: string;
  endDate: string;
  filterOn: boolean;
};

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale
);

export const defaultOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const filterByDate = (
  startDate: string,
  endDate: string,
  data: CBOReport[]
) => {
  return data.filter((report) => {
    const reportDate = new Date(`${report.month} ${report.year}`);
    return reportDate >= new Date(startDate) && reportDate <= new Date(endDate);
  });
};

export function sumField<T>(reportList: T[], field: keyof T) {
  return reportList.reduce((prev, cur) => prev + (cur[field] as number), 0);
}

export const sortKeys = (obj: Record<string, number>) => {
  return Object.entries(obj)
    .sort(([, valueA], [, valueB]) => (valueA > valueB ? -1 : 1))
    .map(([key]) => key);
};

export const sortValues = (obj: Record<string, number>) => {
  return Object.values(obj).sort((a, b) => (a > b ? -1 : 1));
};

export const renderValues = (obj: Record<string, number>, sorted = false) => {
  let object = Object.keys(obj);
  if (sorted) {
    object = sortKeys(obj);
  }
  return object.map((key) => {
    return (
      <li key={key}>
        {key}: {obj[key]}
      </li>
    );
  });
};

const CBO = () => {
  const [filterByDate, setFilterByDate] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const renderDateSelect = () => {
    if (filterByDate) {
      return (
        <div>
          <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
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
                setFilterByDate(false);
              }
            }}
            checked={!filterByDate}
          />
          <label>All Time</label>
        </div>
        <div className="cbo-date-filter-item">
          <input
            type="radio"
            name="date"
            onChange={(e) => {
              if (e.target.checked) {
                setFilterByDate(true);
              }
            }}
          />
          <label>Filter by Date</label>
        </div>
        {renderDateSelect()}
      </div>
    );
  };

  return (
    <div className="cbo">
      {dateFilter()}
      <Ages startDate={startDate} endDate={endDate} filterOn={filterByDate} />
      <Races startDate={startDate} endDate={endDate} filterOn={filterByDate} />
      <PerformanceMeasures
        startDate={startDate}
        endDate={endDate}
        filterOn={filterByDate}
      />
      <ZipCodes
        startDate={startDate}
        endDate={endDate}
        filterOn={filterByDate}
      />
    </div>
  );
};

export default CBO;
