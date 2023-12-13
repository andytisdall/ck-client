import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

import { Race } from '../../state/apis/cboApi';
import { CBOReportProps, defaultOptions } from './CBO';
import { sumField, renderValues, sortKeys, sortValues } from './reportMethods';
import Chart from './Chart';

const Races = ({ reports }: CBOReportProps) => {
  const data = useMemo(() => {
    const races: Race[] = reports.map((r) => r.race);
    return {
      Black: sumField(races, 'raceAfrican'),
      White: sumField(races, 'raceWhite'),
      Asian: sumField(races, 'raceAsian'),
      Latin: sumField(races, 'raceLatin'),
      Other: sumField(races, 'raceOther'),
      Unknown: sumField(races, 'raceUnknown'),
    };
  }, [reports]);

  const chartData = useMemo(() => {
    return {
      labels: sortKeys(data),
      datasets: [
        {
          data: sortValues(data),
          backgroundColor: 'blue',
        },
      ],
    };
  }, [data]);

  const renderChart = () => {
    return <Bar data={chartData} options={defaultOptions} />;
  };

  const renderAges = () => {
    return <ul>{renderValues(data, true)}</ul>;
  };

  return (
    <Chart title="Race">
      <div className="cbo-dataset">
        Number of Reports used: {reports.length}
        {renderAges()}
        {renderChart()}
      </div>
    </Chart>
  );
};

export default Races;
