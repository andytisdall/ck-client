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

import Ages from './Ages';
import Races from './Race';
import PerformanceMeasures from './PerformanceMeasures';
import ZipCodes from './ZipCodes';

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
  return (
    <div className="cbo">
      <Ages />
      <Races />
      <PerformanceMeasures />
      <ZipCodes />
    </div>
  );
};

export default CBO;
