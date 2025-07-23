import { getMonth, format } from "date-fns";

import { ClientMeal } from "../../state/apis/mealProgramApi/doorfrontApi";
import { utcToZonedTime } from "date-fns-tz";

const PastMeals = ({ meals }: { meals: ClientMeal[] }) => {
  const mealsThisMonth = meals?.filter(
    (meal) => getMonth(new Date(meal.date)) === getMonth(new Date())
  );
  const numberOfMealsThisMonth = mealsThisMonth?.reduce(
    (prev, cur) => prev + cur.amount,
    0
  );

  return (
    <div className="doorfront-col">
      <b>Meals received this month ({numberOfMealsThisMonth}):</b>
      <ul>
        {mealsThisMonth
          ?.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
          .map((meal) => (
            <li
              key={meal.id}
            >{`${format(utcToZonedTime(meal.date, "America/Los_Angeles"), "M/d/yy")} - ${meal.amount} meal${meal.amount === 1 ? "" : "s"}`}</li>
          ))}
      </ul>
    </div>
  );
};

export default PastMeals;
