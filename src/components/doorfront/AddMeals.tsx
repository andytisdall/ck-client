import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { format, getMonth } from "date-fns";
import { useDispatch } from "react-redux";
import { utcToZonedTime } from "date-fns-tz";

import {
  useGetClientQuery,
  useAddMealsMutation,
} from "../../state/apis/mealProgramApi/doorfrontApi";
import Loading from "../reusable/loading/Loading";
import { setAlert } from "../../state/apis/slices/alertSlice";
import PastMeals from "./PastMeals";
import ClientInfo from "./Client";

const monthlyMealMax = 30;
const dailyMealMax = 4;

const AddMeals = () => {
  const { barcodeValue } = useParams();

  const [meals, setMeals] = useState(1);
  const [clientInfo, setClientInfo] = useState({ cCode: "", barcode: "" });

  const [addMeals, { isLoading: addIsLoading }] = useAddMealsMutation();

  const { data, isLoading: getIsLoading } = useGetClientQuery(
    barcodeValue || ""
  );

  const pastMeals = data?.clientMeals;
  const client = data?.client;
  const clientId = client?.id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = addIsLoading || getIsLoading;

  const mealsThisMonth = useMemo(() => {
    return (
      pastMeals
        ?.filter(
          (meal) =>
            getMonth(utcToZonedTime(meal.date, "America/Los_Angeles")) ===
            getMonth(new Date())
        )
        .reduce((prev, cur) => prev + cur.amount, 0) || 0
    );
  }, [pastMeals]);

  const mealsToday = useMemo(() => {
    return (
      pastMeals
        ?.filter((meal) => meal.date === format(new Date(), "yyyy-MM-dd"))
        .reduce((prev, cur) => prev + cur.amount, 0) || 0
    );
  }, [pastMeals]);

  const monthlyLimitReached = mealsThisMonth + meals >= monthlyMealMax;
  const dailyLimitReached = mealsToday + meals >= dailyMealMax;

  const cannotAddMeals = monthlyLimitReached || dailyLimitReached;
  const cannotSubmit =
    mealsThisMonth >= monthlyMealMax || mealsToday >= dailyMealMax;

  const onSubmit = async () => {
    if (clientId) {
      const numberOfMeals = cannotSubmit ? 0 : meals;
      await addMeals({
        clientId,
        meals: numberOfMeals,
        ...clientInfo,
      }).unwrap();
      dispatch(setAlert("Data Entered Sucessfully"));
      navigate("..");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!barcodeValue || !pastMeals) {
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
    if (monthlyLimitReached) {
      return "Monthly Limit Reached";
    }
    if (dailyLimitReached) {
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
    return (
      <div className="doorfront-submit-row">
        <button className="cancel" onClick={() => navigate("..")}>
          Cancel
        </button>
        <button className="doorfront-submit" onClick={onSubmit}>
          Submit
        </button>
        <div />
      </div>
    );
  };

  if (!clientId) {
    return <div>Error</div>;
  }

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
