import { useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { Age } from '../../state/apis/cboApi';
import { defaultOptions, CBOReportProps } from './CBO';
import { sumField, renderValues } from './reportMethods';

const Ages = ({ reports }: CBOReportProps) => {
  const [show, setShow] = useState(false);

  const data = useMemo(() => {
    const ages: Age[] = reports.map((r) => r.age);
    return {
      '0 - 17': sumField(ages, 'age17'),
      '18 - 26': sumField(ages, 'age26'),
      '27 - 49': sumField(ages, 'age26'),
      '50 - 60': sumField(ages, 'age60'),
      'Over 60': sumField(ages, 'ageOver60'),
      Unknown: sumField(ages, 'ageUnknown'),
    };
  }, [reports]);

  const chartData = useMemo(() => {
    return {
      labels: Object.keys(data),
      datasets: [{ data: Object.values(data), backgroundColor: 'green' }],
    };
  }, [data]);

  const renderChart = () => {
    return <Bar data={chartData} options={defaultOptions} />;
  };

  const renderAges = () => {
    return <ul>{renderValues(data)}</ul>;
  };

  const openStyle = show ? 'cbo-report-open' : '';

  return (
    <div className={`cbo-report ${openStyle}`}>
      <h2 className="cbo-report-title" onClick={() => setShow(!show)}>
        Age
      </h2>
      {show && (
        <div className="cbo-dataset">
          Number of Reports used: {reports.length}
          {renderAges()}
          {renderChart()}
        </div>
      )}
    </div>
  );
};

export default Ages;
