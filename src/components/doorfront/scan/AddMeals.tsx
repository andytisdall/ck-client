import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";

import {
  useScanQuery,
  useAddMealsMutation,
} from "../../../state/apis/mealProgramApi/doorfrontApi";
import Loading from "../../reusable/loading/Loading";
import { setAlert } from "../../../state/apis/slices/alertSlice";
import PastMeals from "./PastMeals";
import ClientInfo from "./ClientInformation";
import MealCounter from "./MealCounter";
import {
  mealIsWithinMonth,
  monthlyMealMax,
  dailyMealMax,
} from "../doorfrontFunctions";

const AddMeals = () => {
  const { scanValue } = useParams();
  const searchParams = useSearchParams();

  const cCode = searchParams[0].get("cCode");

  const [meals, setMeals] = useState(1);
  const [clientInfo, setClientInfo] = useState({ cCode: "", barcode: "" });

  const [addMeals, { isLoading: addIsLoading }] = useAddMealsMutation();

  const { data, isLoading: getIsLoading } = useScanQuery({
    scanValue: scanValue || "",
    cCode: cCode === "true",
  });

  const pastMeals = data?.clientMeals;
  const client = data?.client;
  const clientId = client?.id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = addIsLoading || getIsLoading;

  const mealsThisMonth = useMemo(() => {
    return (
      pastMeals
        ?.filter((meal) => {
          return mealIsWithinMonth(meal.date);
        })
        .reduce((prev, cur) => prev + cur.amount, 0) || 0
    );
  }, [pastMeals]);

  const mealsToday = useMemo(() => {
    const today = format(new Date(), "M/d/yy");

    return (
      pastMeals
        ?.filter((meal) => {
          const formattedDate = format(new Date(meal.date), "M/d/yy");
          return formattedDate === today;
        })
        .reduce((prev, cur) => prev + cur.amount, 0) || 0
    );
  }, [pastMeals]);

  const regularClient =
    client?.cCode !== "FREEBIE" && client?.cCode !== "189137";

  const monthlyLimitReached = mealsThisMonth + meals >= monthlyMealMax;
  const dailyLimitReached = mealsToday + meals >= dailyMealMax;
  const cannotAddMeals =
    (monthlyLimitReached || dailyLimitReached) && regularClient;

  const cannotSubmitMonthly = mealsThisMonth >= monthlyMealMax;
  const cannotSubmitDaily = mealsToday >= dailyMealMax;
  const cannotSubmit =
    (cannotSubmitDaily || cannotSubmitMonthly) && regularClient;

  const onSubmit = async () => {
    if (clientId && !cannotSubmit) {
      await addMeals({
        clientId,
        meals,
        ...clientInfo,
      }).unwrap();
      dispatch(setAlert("Data Entered Sucessfully"));
      navigate("..");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!scanValue || !pastMeals || !clientId) {
    return (
      <div>
        <h2>Something went wrong</h2>
        <button onClick={() => navigate("..")}>Back</button>
      </div>
    );
  }

  const renderLimitReached = () => {
    if (monthlyLimitReached || cannotSubmitMonthly) {
      return "Monthly Limit Reached";
    }
    if (dailyLimitReached || cannotSubmitDaily) {
      return "Daily Limit Reached";
    }
  };

  const renderCannotSubmit = () => {
    return (
      <div className="doorfront-col">
        <div className="doorfront-alert">
          Cannot add more meals for this client
        </div>
        <div className="doorfront-alert">{renderLimitReached()}</div>
      </div>
    );
  };

  const renderControls = () => {
    const disabledStyle = cannotSubmit ? "btn-inactive" : "";
    return (
      <div className="doorfront-submit-row">
        <button className="cancel" onClick={() => navigate("..")}>
          Cancel
        </button>
        <button
          className={`doorfront-submit ${disabledStyle}`}
          onClick={onSubmit}
        >
          Submit
        </button>
        <div />
      </div>
    );
  };

  return (
    <div>
      <ClientInfo client={client} setClientInfo={setClientInfo} />
      <div className="doorfront">
        {cannotSubmit ? (
          renderCannotSubmit()
        ) : (
          <MealCounter
            meals={meals}
            setMeals={setMeals}
            limitReachedAlert={
              cannotAddMeals ? renderLimitReached() : undefined
            }
          />
        )}
        <PastMeals meals={pastMeals} />
      </div>
      {renderControls()}
    </div>
  );
};

export default AddMeals;
