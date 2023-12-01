import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

import {
  useGetCBOReportsQuery,
  PerformanceMeasures,
} from '../../state/apis/cboApi';
import Loading from '../reusable/loading/Loading';
import {
  sumField,
  renderValues,
  defaultOptions,
  sortKeys,
  sortValues,
} from './CBO';

const PerformanceMeasuresComponent = () => {
  const { data: reports, isLoading } = useGetCBOReportsQuery();

  const data = useMemo(() => {
    if (reports) {
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
    }
  }, [reports]);

  const chartData = useMemo(() => {
    if (data) {
      return {
        labels: sortKeys(data),
        datasets: [
          {
            data: sortValues(data),
            backgroundColor: 'pink',
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
      <h2 className="cbo-title">Race</h2>
      {!data ? <p>No Data</p> : <ul>{renderValues(data, true)}</ul>}
      {renderChart()}
    </div>
  );
};

export default PerformanceMeasuresComponent;
