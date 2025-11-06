import { useState, useMemo } from "react";

import {
  ClientMeal,
  useDeleteMealMutation,
} from "../../../state/apis/mealProgramApi/doorfrontApi";
import DeleteModal from "../DeleteModal";
import { formatMealDate } from "../doorfrontFunctions";
import { mealIsWithinMonth } from "../doorfrontFunctions";

const PastMeals = ({ meals }: { meals: ClientMeal[] }) => {
  const [open, setOpen] = useState(false);
  const [mealHasModalOpen, setMealHasModalOpen] = useState("");

  const [deleteMeal, { isLoading }] = useDeleteMealMutation();

  const mealsThisMonth = useMemo(() => {
    return meals?.filter((meal) => {
      return mealIsWithinMonth(meal.date);
    });
  }, [meals]);

  const numberOfMealsThisMonth =
    mealsThisMonth.reduce((prev, cur) => prev + cur.amount, 0) || 0;

  const openModal = (id: string) => {
    setMealHasModalOpen(id);
  };

  return (
    <div className="doorfront-col doorfront-past">
      <div
        className="doorfront-past-header"
        onClick={() => setOpen((current) => !current)}
      >
        <div className="doorfront-past-header-arrow">
          {open ? <>&darr;</> : <>&rarr;</>}
        </div>
        <b>Meals received this month ({numberOfMealsThisMonth}):</b>
      </div>
      {open && (
        <ul>
          {mealsThisMonth
            ?.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
            .map((meal) => (
              <li key={meal.id} className="doorfront-past-meals-row">
                <div>{`${formatMealDate(meal.date)} - ${meal.amount} meal${meal.amount === 1 ? "" : "s"}`}</div>
                <div className="doorfront-delete-container">
                  <div
                    className="doorfront-delete-meal"
                    onClick={() => openModal(meal.id)}
                  >
                    X
                  </div>
                  {mealHasModalOpen === meal.id && (
                    <DeleteModal
                      onDelete={async () => {
                        await deleteMeal(meal.id).unwrap();
                        setMealHasModalOpen("");
                      }}
                      onCancel={() => setMealHasModalOpen("")}
                      isLoading={isLoading}
                    />
                  )}
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default PastMeals;
