import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  Title,
  LinearScale,
} from "chart.js";
import { useState, useMemo } from "react";
import { format } from "date-fns";

import {
  useGetCBOReportsQuery,
  CBOReport,
  useEmailReportMutation,
} from "../../state/apis/mealProgramApi/cboApi";
import Ages from "./Ages";
import Races from "./Race";
import PerformanceMeasures from "./PerformanceMeasures";
import ZipCodes from "./ZipCodes";
import Loading from "../reusable/loading/Loading";
import Households from "./Households";
import { useGetUserQuery } from "../../state/apis/authApi";
import { subMonths } from "date-fns";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
);

export type CBOReportProps = { reports: CBOReport[] };

export const defaultOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const CBO = () => {
  const [startDate, setStartDate] = useState(
    format(subMonths(new Date(), 1), "yyyy-MM-dd"),
  );
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [filterByCbo, setFilterByCbo] = useState<string>("all");

  const { data: reports, isFetching: reportsIsLoading } = useGetCBOReportsQuery(
    {
      startDate,
      endDate,
    },
  );
  const { data: user, isLoading: userIsLoading } = useGetUserQuery();

  const [emailReport] = useEmailReportMutation();

  const filteredReports = useMemo(() => {
    if (reports) {
      if (filterByCbo !== "all") {
        return reports.filter((rep) => rep.cboName === filterByCbo);
      }
      return reports;
    }
  }, [reports, filterByCbo]);

  const cbos = useMemo(
    () => Array.from(new Set(reports?.map((r) => r.cboName))),
    [reports],
  );

  const cboSelect = (
    <select
      value={filterByCbo}
      onChange={(e) => setFilterByCbo(e.target.value)}
    >
      <option value="all">All CBOs</option>
      {cbos.map((cbo) => (
        <option key={cbo} value={cbo}>
          {cbo}
        </option>
      ))}
    </select>
  );

  if (!user?.admin) {
    return (
      <div className="cbo main">
        <h3>User is not authorized.</h3>
      </div>
    );
  }
  const renderData = () => {
    if (reportsIsLoading || userIsLoading) {
      return (
        <div className="cbo-date-filter">
          {renderDateSelect()}
          <Loading />
        </div>
      );
    }
    if (filteredReports) {
      return (
        <div>
          <div className="cbo-date-filter">
            {renderDateSelect()}
            <div className="cbo-date-input-row">
              Number of reports being used:
              <span className="cbo-date-bold"> {filteredReports?.length}</span>
            </div>
            <div className="cbo-date-input-row"></div>
          </div>
          <Ages reports={filteredReports} />
          <Races reports={filteredReports} />
          <PerformanceMeasures reports={filteredReports} />
          <ZipCodes reports={filteredReports} />
          <Households reports={filteredReports} />
          <button onClick={() => emailReport()}>Email Reports</button>
        </div>
      );
    }
  };

  const renderDateSelect = () => {
    return (
      <div className="cbo-date-input-row">
        <span className="cbo-date-bold">Date Range:</span>
        <div className="cbo-date-input-section">
          <input
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            type="date"
            className="cbo-date-input"
          />
          <p>to</p>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            className="cbo-date-input"
          />
        </div>
        {cboSelect}
        <label htmlFor="oasis-only">Filter by CBO</label>
      </div>
    );
  };

  if (filteredReports) {
    return (
      <div className="cbo main">
        <h1>CBO Report Data</h1>

        {renderData()}
      </div>
    );
  }
  return <div className="cbo main">No Data Found. Try refreshing.</div>;
};

export default CBO;
