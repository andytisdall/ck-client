import { useMemo, useState, useRef } from 'react';
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
  CBOReportProps,
  filterByDate,
} from './CBO';

const PerformanceMeasuresComponent = ({
  startDate,
  endDate,
  filterOn,
}: CBOReportProps) => {
  const [show, setShow] = useState(false);
  const { data: reports, isLoading } = useGetCBOReportsQuery();

  const noOfReports = useRef<number>();

  const data = useMemo(() => {
    if (reports) {
      let filteredReports = reports;
      if (filterOn) {
        filteredReports = filterByDate(startDate, endDate, reports);
      }
      noOfReports.current = filteredReports.length;
      const performanceMeasures: PerformanceMeasures[] = filteredReports.map(
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
  }, [reports, filterOn, endDate, startDate]);

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

  const openStyle = show ? 'cbo-report-open' : '';

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={`cbo-report ${openStyle}`}>
      <h2 onClick={() => setShow(!show)} className="cbo-report-title">
        Performance Measures
      </h2>
      {show && (
        <div className="cbo-dataset">
          Number of Reports used: {noOfReports.current}
          {!data ? <p>No Data</p> : <ul>{renderValues(data, true)}</ul>}
          {renderChart()}
        </div>
      )}
    </div>
  );
};

export default PerformanceMeasuresComponent;
