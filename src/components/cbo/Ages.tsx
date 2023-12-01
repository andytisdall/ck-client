import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

import { useGetCBOReportsQuery, Age } from '../../state/apis/cboApi';
import Loading from '../reusable/loading/Loading';
import { sumField, renderValues, defaultOptions } from './CBO';

const Ages = () => {
  const { data: reports, isLoading } = useGetCBOReportsQuery();

  const data = useMemo(() => {
    if (reports) {
      const ages: Age[] = reports.map((r) => r.age);
      return {
        '0 - 17': sumField(ages, 'age17'),
        '18 - 26': sumField(ages, 'age26'),
        '27 - 49': sumField(ages, 'age26'),
        '50 - 60': sumField(ages, 'age60'),
        'Over 60': sumField(ages, 'ageOver60'),
        Unknown: sumField(ages, 'ageUnknown'),
      };
    }
  }, [reports]);

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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="cbo-dataset">
      <h2 className="cbo-title">Age</h2>
      {renderAges()}
      {renderChart()}
    </div>
  );
};

export default Ages;
