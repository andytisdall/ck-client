import { CBOReport } from '../../state/apis/cboApi';

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
