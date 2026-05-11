import { useMemo, useState } from "react";
import { format } from "date-fns";

import { useGetMealsQuery } from "../../../state/apis/mealProgramApi/doorfrontApi";
import Loading from "../../reusable/loading/Loading";
import "./DoorfrontReport.css";

const MealsByDay = () => {
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [copiedList, setCopiedList] = useState<number>();

  const { data: meals, isFetching } = useGetMealsQuery({
    startDate: date,
    endDate: date,
  });

  const mealsByAmount = useMemo(() => {
    const obj: Record<number, string[]> = {};

    meals?.forEach((meal) => {
      const clientId = meal.client?.cCode;
      if (clientId) {
        if (!obj[meal.amount]) {
          obj[meal.amount] = [clientId];
        } else {
          obj[meal.amount].push(clientId);
        }
      }
    });
    return obj;
  }, [meals]);

  const renderMealsByAmount = () => {
    if (!meals?.length) {
      return <div>No meals found for this date.</div>;
    }
    const amounts = Object.keys(mealsByAmount)
      .map((key) => parseInt(key))
      .sort();
    return (
      <div>
        <h4>Clients on this date who received:</h4>
        {amounts.map((amount) => {
          const clientIds = mealsByAmount[amount];
          return (
            <div key={amount} className="meal-report-row-container">
              <div className="meal-report-row">
                <div className="meal-report-col">
                  {copiedList === amount && (
                    <div className="meal-report-copied-alert">Copied!</div>
                  )}
                  {amount} Meal{amount > 1 && "s"}:
                </div>
                <div className="meal-report-col">
                  <button
                    onClick={() => {
                      const text = clientIds.join(",");
                      navigator.clipboard.writeText(text);
                      setCopiedList(amount);
                    }}
                  >
                    Copy Client IDs
                  </button>
                </div>
                <div className="meal-report-col">
                  {clientIds.length} clients
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div>
      <h2>Copy Client IDs by Date & Number of Meals</h2>
      <label htmlFor="date">Date:</label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      {renderMealsByAmount()}
    </div>
  );
};

export default MealsByDay;
