import { getDate, subMonths, addMonths, format } from "date-fns";
import { useMemo } from "react";

import { useGetMonthlyMealsQuery } from "../../../state/apis/mealProgramApi/doorfrontApi";
import Loading from "../../reusable/loading/Loading";

const MonthlyReport = () => {
  const { data: monthlyMeals, isLoading } = useGetMonthlyMealsQuery();

  const values = useMemo(() => {
    if (monthlyMeals) {
      const count = { "1-10": 0, "11-20": 0, "21-30": 0, "30+": 0 };

      const values = Object.values(monthlyMeals).sort();

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

      return (
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
      );
    }
  }, [monthlyMeals]);

  let startDate: Date;
  let endDate: Date;

  const today = new Date();
  const todaysDate = getDate(today);
  if (todaysDate < 15) {
    const lastMonth = subMonths(today, 1);
    lastMonth.setDate(15);
    startDate = lastMonth;
    today.setDate(14);
    endDate = today;
  } else {
    const nextMonth = addMonths(today, 1);
    nextMonth.setDate(14);
    endDate = nextMonth;
    today.setDate(15);
    startDate = today;
  }

  const uniqueClients = monthlyMeals ? Object.keys(monthlyMeals).length : 0;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h3>
        Monthly Report: {format(startDate, "M/d/yy")} -{" "}
        {format(endDate, "M/d/yy")}
      </h3>
      {values}
      <div>Number of unique clients: {uniqueClients}</div>
    </div>
  );
};

export default MonthlyReport;
