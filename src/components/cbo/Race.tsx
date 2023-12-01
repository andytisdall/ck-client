import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

import { useGetCBOReportsQuery, Race } from '../../state/apis/cboApi';
import Loading from '../reusable/loading/Loading';
import {
  sumField,
  renderValues,
  defaultOptions,
  sortKeys,
  sortValues,
} from './CBO';

const Races = () => {
  const { data: reports, isLoading } = useGetCBOReportsQuery();

  const data = useMemo(() => {
    if (reports) {
      const races: Race[] = reports.map((r) => r.race);
      return {
        Black: sumField(races, 'raceAfrican'),
        White: sumField(races, 'raceWhite'),
        Asian: sumField(races, 'raceAsian'),
        Latin: sumField(races, 'raceLatin'),
        Other: sumField(races, 'raceOther'),
        Unknown: sumField(races, 'raceUnknown'),
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
            backgroundColor: 'blue',
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

  const renderAges = () => {
    if (!data) {
      return <p>Reports not found</p>;
    }

    return <ul>{renderValues(data, true)}</ul>;
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="cbo-dataset">
      <h2 className="cbo-title">Race</h2>
      {renderAges()}
      {renderChart()}
    </div>
  );
};

export default Races;
