import { getMonth, format } from "date-fns";
import { useState } from "react";

import {
  ClientMeal,
  useDeleteMealMutation,
} from "../../../state/apis/mealProgramApi/doorfrontApi";
import { utcToZonedTime } from "date-fns-tz";
import DeleteModal from "../DeleteModal";

const PastMeals = ({ meals }: { meals: ClientMeal[] }) => {
  const [open, setOpen] = useState(false);
  const [mealHasModalOpen, setMealHasModalOpen] = useState("");

  const [deleteMeal] = useDeleteMealMutation();

  const mealsThisMonth = meals?.filter(
    (meal) => getMonth(new Date(meal.date)) === getMonth(new Date())
  );
  const numberOfMealsThisMonth = mealsThisMonth?.reduce(
    (prev, cur) => prev + cur.amount,
    0
  );

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
                <div>{`${format(utcToZonedTime(meal.date, "America/Los_Angeles"), "M/d/yy")} - ${meal.amount} meal${meal.amount === 1 ? "" : "s"}`}</div>
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
