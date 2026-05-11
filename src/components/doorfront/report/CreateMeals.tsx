import { FormEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";

import { useAddMealsMutation } from "../../../state/apis/mealProgramApi/doorfrontApi";
import Loading from "../../reusable/loading/Loading";
import { setAlert } from "../../../state/apis/slices/alertSlice";
import { setError } from "../../../state/apis/slices/errorSlice";
import { useNavigate } from "react-router-dom";

const CreateMeals = () => {
  const [amount, setAmount] = useState("");
  const [clientId, setClientId] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const [addMeals, { isLoading }] = useAddMealsMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const meals = parseInt(amount);

    if (isNaN(meals)) {
      return dispatch(setError("Number of meals must be a number"));
    }

    await addMeals({ meals, clientId, findByCCode: true, date }).unwrap();
    dispatch(setAlert("Meal(s) Added Successfully"));
    setAmount("");
    setClientId("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>Create Meals</h2>
        <div>
          <label htmlFor="clientId">Client ID:</label>
          <input
            required
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value.toUpperCase())}
          />
        </div>
        <div>
          <label htmlFor="amount">Number of Meals:</label>
          <input
            required
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            required
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {isLoading ? <Loading /> : <input type="submit" />}
      </form>
      <button className="cancel" onClick={() => navigate("..")}>
        Back
      </button>
    </div>
  );
};

export default CreateMeals;
