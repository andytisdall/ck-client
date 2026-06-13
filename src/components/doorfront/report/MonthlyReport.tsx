import { useMemo, useState } from "react";
import {
  MonthlyReportResponse,
  useGetMonthlyMealsQuery,
} from "../../../state/apis/mealProgramApi/doorfrontApi";
import Loading from "../../reusable/loading/Loading";
import "./DoorfrontReport.css";

const MonthlyReport = ({
  startDate,
  endDate,
  isLoading,
}: {
  startDate: string;
  endDate: string;
  isLoading?: boolean;
}) => {
  const [sunMonOnly, setSunMonOnly] = useState(false);
  const { data, isFetching } = useGetMonthlyMealsQuery({
    startDate,
    endDate,
    sunMonOnly,
  });

  const clients: MonthlyReportResponse = useMemo(() => data || {}, [data]);
  const clientsWithoutUnknown = useMemo(() => {
    const _clientsWithoutUnknown = { ...clients };
    delete _clientsWithoutUnknown["unknown"];
    return _clientsWithoutUnknown;
  }, [clients]);

  const mealBrackets = useMemo(() => {
    const count = { "1-10": 0, "11-20": 0, "21-30": 0, "30+": 0 };

    const values = Object.values(clientsWithoutUnknown).map((c) => c.meals);

    values.forEach((v) => {
      if (v < 11) {
        count["1-10"] += 1;
      } else if (v < 21) {
        count["11-20"] += 1;
      } else if (v < 31) {
        count["21-30"] += 1;
      } else {
        count["30+"] += 1;
      }
    });

    return count;
  }, [clientsWithoutUnknown]);

  const totalMeals = Object.values(clients)
    .map((c) => c.meals)
    .reduce((prev, cur) => prev + cur, 0);

  const uniqueClients = Object.keys(clientsWithoutUnknown).length;

  const averageVisitsPerClient = useMemo(() => {
    const visitsPerClient =
      Math.round(
        (Object.values(clientsWithoutUnknown).reduce(
          (prev, cur) => prev + cur.visits,
          0,
        ) /
          uniqueClients) *
          100,
      ) / 100;
    return isNaN(visitsPerClient) ? 0 : visitsPerClient;
  }, [clientsWithoutUnknown, uniqueClients]);

  const totalVisits = Object.values(clients)
    .map((c) => c.visits)
    .reduce((prev, cur) => prev + cur, 0);

  const renderBreakdown = () => {
    return (
      <div>
        <h4>Meals Per Client:</h4>
        <ul>
          <li>
            <strong>1 - 10 Meals:</strong> {mealBrackets["1-10"]} clients
          </li>
          <li>
            <strong>11 - 20 Meals:</strong> {mealBrackets["11-20"]} clients
          </li>
          <li>
            <strong>21 - 30 Meals:</strong> {mealBrackets["21-30"]} clients
          </li>
          <li>
            <strong>Over 30 Meals:</strong> {mealBrackets["30+"]} clients
          </li>
        </ul>
      </div>
    );
  };

  const untrackedVisits = data?.unknown?.visits || 0;
  const untrackedVisitsPercent = Math.round(
    (untrackedVisits / totalVisits) * 100,
  );
  const untrackedMeals = data?.unknown?.meals || 0;
  const untrackedMealsPercent = Math.round((untrackedMeals / totalMeals) * 100);

  const renderData = () => {
    if (isFetching || isLoading) {
      return <Loading />;
    }

    return (
      <div className="monthly-report">
        <div className="monthly-report-title">Number of unique clients:</div>
        <div>{uniqueClients}</div>
        <div className="monthly-report-title">
          Average number of visits per client:
        </div>
        <div>{averageVisitsPerClient}</div>
        <div className="monthly-report-title">Total number of visits:</div>
        <div>{totalVisits}</div>
        <div className="monthly-report-title">Total number of meals:</div>
        <div>{totalMeals}</div>
        <div className="monthly-report-title">Number of untracked visits:</div>
        <div>
          {untrackedVisits}
          <span className="monthly-report-footnote">
            {isNaN(untrackedVisitsPercent)
              ? ""
              : `(${untrackedVisitsPercent}%)`}
          </span>
        </div>
        <div className="monthly-report-title">Number of untracked meals:</div>
        <div>
          {untrackedMeals}
          <span className="monthly-report-footnote">
            {isNaN(untrackedMealsPercent) ? "" : `(${untrackedMealsPercent}%)`}
          </span>
        </div>
        {renderBreakdown()}
      </div>
    );
  };

  return (
    <div>
      <div className="monthly-report-sun-mon">
        <label>Sunday & Monday doorfront meals only</label>
        <input
          type="checkbox"
          checked={sunMonOnly}
          onChange={(e) => setSunMonOnly(e.target.checked)}
        />
      </div>
      {renderData()}
    </div>
  );
};

export default MonthlyReport;
