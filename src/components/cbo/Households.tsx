import { useMemo, useState } from 'react';

import { CBOReportProps } from './CBO';
import { sumField, renderValues } from './reportMethods';

const Households = ({ reports }: CBOReportProps) => {
  const [show, setShow] = useState(false);

  const data = useMemo(() => {
    return {
      'Households Provided Meals': sumField(reports, 'households'),
    };
  }, [reports]);

  const renderHouseholds = () => {
    return <ul>{renderValues(data)}</ul>;
  };

  const openStyle = show ? 'cbo-report-open' : '';

  return (
    <div className={`cbo-report ${openStyle}`}>
      <h2 className="cbo-report-title" onClick={() => setShow(!show)}>
        Households
      </h2>
      {show && (
        <div className="cbo-dataset">
          Number of Reports used: {reports.length}
          {renderHouseholds()}
        </div>
      )}
    </div>
  );
};

export default Households;
