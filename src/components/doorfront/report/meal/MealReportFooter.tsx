import { ClientMeal } from "../../../../state/apis/mealProgramApi/doorfrontApi";

const MealReportFooter = ({ meals }: { meals: ClientMeal[] }) => {
  const totalMeals = meals.reduce((prev, cur) => prev + cur.amount, 0);
  const totalRecords = meals.length;
  return (
    <div className="meal-report-row">
      <div className="meal-report-checkbox"></div>
      <div className="meal-report-col">Total Records: {totalRecords}</div>
      <div className="meal-report-col">Total Meals: {totalMeals}</div>
      <div className="meal-report-col"></div>
      <div className="meal-report-col"></div>
    </div>
  );
};

export default MealReportFooter;
