import { useGetMonthlyMealsQuery } from "../../../state/apis/mealProgramApi/doorfrontApi";
import Loading from "../../reusable/loading/Loading";

const MonthlyReport = ({ month, year }: { month: number; year: number }) => {
  const { data, isFetching } = useGetMonthlyMealsQuery({ month, year });

  const meals = data || {};

  const count = { "1-10": 0, "11-20": 0, "21-30": 0, "30+": 0 };

  const values = Object.values(meals).sort();

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

  const uniqueClients = Object.keys(meals).length;

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div>
      <ul>
        <li>
          <strong>1 - 10 Meals: {count["1-10"]} clients</strong>
        </li>
        <li>
          <strong>11 - 20 Meals: {count["11-20"]} clients</strong>
        </li>
        <li>
          <strong>21 - 30 Meals: {count["21-30"]} clients</strong>
        </li>
        <li>
          <strong>Over 30 Meals: {count["30+"]} clients</strong>
        </li>
      </ul>
      <div>Number of unique clients: {uniqueClients}</div>
    </div>
  );
};

export default MonthlyReport;
