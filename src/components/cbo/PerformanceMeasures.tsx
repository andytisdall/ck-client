import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

import { PerformanceMeasures } from '../../state/apis/cboApi';
import { defaultOptions, CBOReportProps } from './CBO';
import {
  sumField,
  renderValues,
  sortKeys,
  sortValues,
  averageField,
} from './reportMethods';
import Chart from './Chart';

const PerformanceMeasuresComponent = ({ reports }: CBOReportProps) => {
  const data = useMemo(() => {
    const performanceMeasures: PerformanceMeasures[] = reports.map(
      (r) => r.performanceMeasures
    );
    return {
      'Percent without Access to Kitchen': averageField(
        reports,
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

  return (
    <Chart title="Performance Measures">
      <div className="cbo-dataset">
        {!data ? <p>No Data</p> : <ul>{renderValues(data, true)}</ul>}
        {renderChart()}
      </div>
    </Chart>
  );
};

export default PerformanceMeasuresComponent;
