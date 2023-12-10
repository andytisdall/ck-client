import { useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { PerformanceMeasures } from '../../state/apis/cboApi';
import { defaultOptions, CBOReportProps } from './CBO';
import { sumField, renderValues, sortKeys, sortValues } from './reportMethods';

const PerformanceMeasuresComponent = ({ reports }: CBOReportProps) => {
  const [show, setShow] = useState(false);

  const data = useMemo(() => {
    const performanceMeasures: PerformanceMeasures[] = reports.map(
      (r) => r.performanceMeasures
    );
    return {
      'Percent without Access to something': sumField(
        performanceMeasures,
        'percentWOAccess'
      ),
      'Meals Provided': sumField(performanceMeasures, 'mealsProvided'),
      'Unusable Meals': sumField(performanceMeasures, 'unusable'),
      'Number of Calfresh postcards given out': sumField(
        performanceMeasures,
        'postcards'
      ),
      'Number of Calfresh applications assisted': sumField(
        performanceMeasures,
        'calfreshApps'
      ),
      'Number of Calfresh applications sent to SSA': sumField(
        performanceMeasures,
        'SSA'
      ),
    };
  }, [reports]);

  const chartData = useMemo(() => {
    return {
      labels: sortKeys(data),
      datasets: [
        {
          data: sortValues(data),
          backgroundColor: 'pink',
        },
      ],
    };
  }, [data]);

  const renderChart = () => {
    return <Bar data={chartData} options={defaultOptions} />;
  };

  const openStyle = show ? 'cbo-report-open' : '';

  return (
    <div className={`cbo-report ${openStyle}`}>
      <h2 onClick={() => setShow(!show)} className="cbo-report-title">
        Performance Measures
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

export default PerformanceMeasuresComponent;
