import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  Title,
  LinearScale,
  //@ts-ignore
} from "chart.js";
import { useState, useMemo } from "react";
import { subMonths, format } from "date-fns";

import MonthlyReport from "../doorfront/report/MonthlyReport";
import {
  CBOReport,
  useGetCBOReportsQuery,
  useEmailReportMutation,
} from "../../state/apis/mealProgramApi/cboApi";
import Ages from "./Ages";
import Races from "./Race";
import PerformanceMeasures from "./PerformanceMeasures";
import ZipCodes from "./ZipCodes";
import Loading from "../reusable/loading/Loading";
import Households from "./Households";
import { useGetUserQuery } from "../../state/apis/authApi";
import { useDebounce } from "../../hooks/useDebounce";

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

  const debouncedQuery = useDebounce({ startDate, endDate });

  const { data: reports, isFetching: reportsIsLoading } = useGetCBOReportsQuery(
    {
      startDate: debouncedQuery.startDate,
      endDate: debouncedQuery.endDate,
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
      {[...cbos, "CK Doorfront"].map((cbo) => (
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
    if (filterByCbo === "CK Doorfront") {
      return (
        <div>
          <MonthlyReport
            startDate={debouncedQuery.startDate}
            endDate={debouncedQuery.endDate}
          />
        </div>
      );
    }
    if (reportsIsLoading || userIsLoading) {
      return <Loading />;
    }
    if (filteredReports) {
      return (
        <div>
          <div className="monthly-report-sun-mon">
            Number of reports being used:
            <span className="cbo-date-bold"> {filteredReports?.length}</span>
          </div>
          <Ages reports={filteredReports} />
          <Races reports={filteredReports} />
          <PerformanceMeasures reports={filteredReports} />
          <ZipCodes reports={filteredReports} />
          <Households reports={filteredReports} />
        </div>
      );
    }
  };

  const renderDateSelect = () => {
    return (
      <div className="cbo-input">
        <div className="cbo-date-input-row">
          <span className="cbo-date-bold">Date Range:</span>
          <div className="cbo-date-input-section">
            <input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              className="cbo-date-input"
            />
            <p>to</p>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="cbo-date-input"
            />
          </div>
        </div>
        {startDate > endDate && (
          <div className="cbo-error">
            Start date cannot be later than end date
          </div>
        )}

        <div className="cbo-date-input-row">
          <label htmlFor="oasis-only">
            <span className="cbo-date-bold">Filter by CBO</span>
          </label>
          <div className="cbo-date-input-section">{cboSelect}</div>
        </div>
      </div>
    );
  };

  if (filteredReports) {
    return (
      <div className="cbo main">
        <h1>CBO Report Data</h1>
        <div className="cbo-date-input-row">
          <button onClick={() => emailReport()}>
            Email Monthly / YTD Reports
          </button>
        </div>
        <div className="cbo-date-filter">{renderDateSelect()}</div>
        {renderData()}
      </div>
    );
  }
  return <div className="cbo main">No Data Found. Try refreshing.</div>;
};

export default CBO;
