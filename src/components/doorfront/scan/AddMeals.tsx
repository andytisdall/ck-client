import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { format, getMonth } from "date-fns";
import { useDispatch } from "react-redux";

import {
  useScanQuery,
  useAddMealsMutation,
} from "../../../state/apis/mealProgramApi/doorfrontApi";
import Loading from "../../reusable/loading/Loading";
import { setAlert } from "../../../state/apis/slices/alertSlice";
import PastMeals from "./PastMeals";
import ClientInfo from "./ClientInformation";
import { formatMealDate } from "../report/meal/MealReportRow";

const monthlyMealMax = 30;
const dailyMealMax = 4;

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

  const mealsThisMonth =
    pastMeals
      ?.filter((meal) => {
        const mealMonth = getMonth(new Date(meal.date));
        const thisMonth = getMonth(new Date());
        return mealMonth === thisMonth;
      })
      .reduce((prev, cur) => prev + cur.amount, 0) || 0;

  const mealsToday = useMemo(() => {
    const today = format(new Date(), "M/d/yy");

    return (
      pastMeals
        ?.filter((meal) => {
          const formattedDate = formatMealDate(meal.date);
          return formattedDate === today;
        })
        .reduce((prev, cur) => prev + cur.amount, 0) || 0
    );
  }, [pastMeals]);

  const monthlyLimitReached = mealsThisMonth + meals >= monthlyMealMax;
  const dailyLimitReached = mealsToday + meals >= dailyMealMax;
  const cannotAddMeals = monthlyLimitReached || dailyLimitReached;

  const cannotSubmitMonthly = mealsThisMonth >= monthlyMealMax;
  const cannotSubmitDaily = mealsToday >= dailyMealMax;
  const cannotSubmit = cannotSubmitDaily || cannotSubmitMonthly;

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

  if (!scanValue || !pastMeals) {
    return (
      <div>
        <h2>Something went wrong</h2>
        <button onClick={() => navigate("..")}>Back</button>
      </div>
    );
  }

  const renderAddMeals = () => {
    return (
      <div className="doorfront-col">
        <b>Client is receiving</b>
        <h3 className="doorfront-meal-count">{`${meals} meal${meals === 1 ? "" : "s"}`}</h3>
        {cannotAddMeals && (
          <div className="doorfront-alert">{renderLimitReached()}</div>
        )}

        <div className="doorfront-btns">
          <button
            className={
              "doorfront-btn-sub doorfront-btn " +
              (meals === 1 ? "btn-inactive" : "")
            }
            onClick={() => {
              if (meals > 1) {
                setMeals((current) => current - 1);
              }
            }}
          >
            -
          </button>
          <button
            className={
              "doorfront-btn-add doorfront-btn " +
              (cannotAddMeals ? "btn-inactive" : "")
            }
            onClick={() => {
              if (!cannotAddMeals) {
                setMeals((current) => current + 1);
              }
            }}
          >
            +
          </button>
        </div>
      </div>
    );
  };

  const renderLimitReached = () => {
    if (monthlyLimitReached || cannotSubmitMonthly) {
      return "Monthly Limit Reached";
    }
    if (dailyLimitReached || cannotSubmitDaily) {
      return "Daily Limit Reached";
    }
  };

  const renderCannotAdd = () => {
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

  if (!clientId) {
    return <div>Error</div>;
  }

  // console.log(cannotSubmit);
  return (
    <div>
      <ClientInfo client={client} setClientInfo={setClientInfo} />
      <div className="doorfront">
        {cannotSubmit ? renderCannotAdd() : renderAddMeals()}
        <PastMeals meals={pastMeals} />
      </div>

      {renderControls()}
    </div>
  );
};

export default AddMeals;
