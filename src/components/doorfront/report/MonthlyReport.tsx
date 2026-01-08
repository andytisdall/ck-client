import { useMemo } from "react";
import {
  MonthlyReportResponse,
  useGetMonthlyMealsQuery,
} from "../../../state/apis/mealProgramApi/doorfrontApi";
import Loading from "../../reusable/loading/Loading";

const MonthlyReport = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const { data, isFetching } = useGetMonthlyMealsQuery({ startDate, endDate });

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

  const uniqueClients = Object.keys(clients).length;

  const averageVisitsPerClient = useMemo(() => {
    return (
      Math.round(
        (Object.values(clientsWithoutUnknown).reduce(
          (prev, cur) => prev + cur.visits,
          0
        ) /
          uniqueClients) *
          100
      ) / 100
    );
  }, [clientsWithoutUnknown, uniqueClients]);

  const totalVisits = Object.values(clients)
    .map((c) => c.visits)
    .reduce((prev, cur) => prev + cur, 0);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div>
      <ul>
        <li>
          <strong>1 - 10 Meals: {mealBrackets["1-10"]} clients</strong>
        </li>
        <li>
          <strong>11 - 20 Meals: {mealBrackets["11-20"]} clients</strong>
        </li>
        <li>
          <strong>21 - 30 Meals: {mealBrackets["21-30"]} clients</strong>
        </li>
        <li>
          <strong>Over 30 Meals: {mealBrackets["30+"]} clients</strong>
        </li>
      </ul>
      <div>Number of unique clients: {uniqueClients}</div>
      <div>Average number of visits per client: {averageVisitsPerClient}</div>
      <div>Total number of visits: {totalVisits}</div>
      <div>Total number of meals: {totalMeals}</div>
      <div>Number of untracked visits: {data?.unknown?.visits || 0}</div>

      <div>Number of untracked meals: {data?.unknown?.meals || 0}</div>
    </div>
  );
};

export default MonthlyReport;
