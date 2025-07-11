import { format } from "date-fns";

import { useLazyGetMealsQuery } from "../../state/apis/mealProgramApi/doorfrontApi";
import Loading from "../reusable/loading/Loading";
import { useEffect } from "react";

const today = format(new Date(), "yyyy-MM-dd");

const MealReport = () => {
  const [getMeals, { data: meals, isLoading }] = useLazyGetMealsQuery();

  useEffect(() => {
    getMeals(today);
  }, [getMeals]);

  const renderMeals = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (!meals?.length) {
      return <div>No meals found for this date.</div>;
    }
    return meals.map((meal) => <div key={meal.id}>{meal.amount}</div>);
  };

  return (
    <div>
      <input
        type="date"
        defaultValue={today}
        onChange={(e) => getMeals(e.target.value)}
      />
      {renderMeals()}
    </div>
  );
};

export default MealReport;
