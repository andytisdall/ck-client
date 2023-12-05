import { useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { useGetCBOReportsQuery, Age } from '../../state/apis/cboApi';
import Loading from '../reusable/loading/Loading';
import {
  sumField,
  renderValues,
  defaultOptions,
  CBOReportProps,
  filterByDate,
} from './CBO';

const Ages = ({ startDate, endDate, filterOn }: CBOReportProps) => {
  const [show, setShow] = useState(false);
  const { data: reports, isLoading } = useGetCBOReportsQuery();

  const data = useMemo(() => {
    if (reports) {
      let filteredReports = reports;
      if (filterOn) {
        filteredReports = filterByDate(startDate, endDate, reports);
      }
      const ages: Age[] = filteredReports.map((r) => r.age);
      return {
        '0 - 17': sumField(ages, 'age17'),
        '18 - 26': sumField(ages, 'age26'),
        '27 - 49': sumField(ages, 'age26'),
        '50 - 60': sumField(ages, 'age60'),
        'Over 60': sumField(ages, 'ageOver60'),
        Unknown: sumField(ages, 'ageUnknown'),
      };
    }
  }, [reports, startDate, endDate, filterOn]);

  const chartData = useMemo(() => {
    if (data) {
      return {
        labels: Object.keys(data),
        datasets: [{ data: Object.values(data), backgroundColor: 'green' }],
      };
    }
  }, [data]);

  const renderChart = () => {
    if (chartData) {
      return <Bar data={chartData} options={defaultOptions} />;
    }
  };

  const renderAges = () => {
    if (!data) {
      return <p>Reports not found</p>;
    }

    return <ul>{renderValues(data)}</ul>;
  };

  const openStyle = show ? 'cbo-report-open' : '';

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={`cbo-report ${openStyle}`}>
      <h2 className="cbo-report-title" onClick={() => setShow(!show)}>
        Age
      </h2>
      {show && (
        <div className="cbo-dataset">
          {renderAges()}
          {renderChart()}
        </div>
      )}
    </div>
  );
};

export default Ages;
