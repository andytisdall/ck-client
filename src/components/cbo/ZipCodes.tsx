import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

import { useGetCBOReportsQuery, ZipCode } from '../../state/apis/cboApi';
import Loading from '../reusable/loading/Loading';
import {
  sumField,
  renderValues,
  defaultOptions,
  sortKeys,
  sortValues,
} from './CBO';

const ZipCodes = () => {
  const { data: reports, isLoading } = useGetCBOReportsQuery();

  const data = useMemo(() => {
    if (reports) {
      const zips: Record<ZipCode, number | undefined>[] = reports.map(
        (r) => r.zips
      );

      const obj: Partial<Record<ZipCode, number>> = {};

      Object.keys(zips[0]).forEach((key) => {
        const sum = sumField(zips, key as ZipCode);
        obj[key as ZipCode] = sum;
      });

      return obj;
    }
  }, [reports]);

  const chartData = useMemo(() => {
    if (data) {
      return {
        labels: sortKeys(data),
        datasets: [
          {
            data: sortValues(data),
            backgroundColor: 'purple',
          },
        ],
      };
    }
  }, [data]);

  const renderChart = () => {
    if (chartData) {
      return <Bar data={chartData} options={defaultOptions} />;
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="cbo-dataset">
      <h2 className="cbo-title">Zip Codes</h2>
      {!data ? <p>No Data</p> : <ul>{renderValues(data, true)}</ul>}
      {renderChart()}
    </div>
  );
};

export default ZipCodes;
