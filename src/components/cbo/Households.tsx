import { useMemo } from 'react';

import { CBOReportProps } from './CBO';
import { sumField, renderValues } from './reportMethods';
import Chart from './Chart';

const Households = ({ reports }: CBOReportProps) => {
  const data = useMemo(() => {
    return {
      'Households Provided Meals': sumField(reports, 'households'),
    };
  }, [reports]);

  const renderHouseholds = () => {
    return <ul>{renderValues(data)}</ul>;
  };

  return (
    <Chart title="Households">
      <p>Number of Reports used: {reports.length}</p>
      {renderHouseholds()}
    </Chart>
  );
};

export default Households;
