import { useMemo, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import randomColor from 'randomcolor';

import { ZipCode } from '../../state/apis/cboApi';
import { sumField, renderValues, sortKeys, sortValues } from './reportMethods';
import { CBOReportProps } from './CBO';

const ZipCodes = ({ reports }: CBOReportProps) => {
  const [show, setShow] = useState(false);

  const data = useMemo(() => {
    const zips: Record<ZipCode, number | undefined>[] = reports.map(
      (r) => r.zips
    );

    const obj: Partial<Record<ZipCode, number>> = {};
    if (zips[0]) {
      Object.keys(zips[0]).forEach((key) => {
        const sum = sumField(zips, key as ZipCode);
        obj[key as ZipCode] = sum;
      });
    }

    return obj;
  }, [reports]);

  const createColors = useMemo(() => {
    return Object.keys(data).map(() => randomColor());
  }, [data]);

  const chartData = useMemo(() => {
    return {
      labels: sortKeys(data),
      datasets: [
        {
          data: sortValues(data),
          backgroundColor: createColors,
        },
      ],
    };
  }, [data, createColors]);

  const renderChart = () => {
    return <Pie data={chartData} />;
  };

  const openStyle = show ? 'cbo-report-open' : '';

  return (
    <div className={`cbo-report ${openStyle}`}>
      <h2 onClick={() => setShow(!show)} className="cbo-report-title">
        Zip Codes
      </h2>
      {show && (
        <div className="cbo-dataset">
          Number of Reports used: {reports.length}
          {!data ? <p>No Data</p> : <ul>{renderValues(data, true)}</ul>}
          {renderChart()}
        </div>
      )}
    </div>
  );
};

export default ZipCodes;
