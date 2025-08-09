import { format } from "date-fns";

import { ClientMeal } from "../../../../state/apis/mealProgramApi/doorfrontApi";

export const formatMealDate = (date: string) => {
  const dateArray = new Date(date).toUTCString().split(" ");
  return format(
    new Date([dateArray[1], dateArray[2], dateArray[3]].join(" ")),
    "M/d/yy"
  );
};

const MealReportRow = ({
  meal,
  selected,
  setSelected,
}: {
  meal: ClientMeal;
  selected: boolean;
  setSelected: (checked: boolean) => void;
}) => {
  const clientId = meal.client.cCode;

  const dateString = formatMealDate(meal.date);

  const renderCheck = () => {
    if (meal.logged) {
      return <>&check;</>;
    }
    if (clientId) {
      return (
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => setSelected(e.target.checked)}
        />
      );
    }
  };
  return (
    <div className="meal-report-row">
      <div className="meal-report-checkbox">{renderCheck()}</div>
      <div className="meal-report-col">{dateString}</div>
      <div className="meal-report-col">{meal.amount}</div>
      <div className="meal-report-col">{clientId}</div>
    </div>
  );
};

export default MealReportRow;
