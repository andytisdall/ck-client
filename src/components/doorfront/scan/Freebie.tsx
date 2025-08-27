import { useDispatch } from "react-redux";

import { useAddMealsMutation } from "../../../state/apis/mealProgramApi/doorfrontApi";
import { setAlert } from "../../../state/apis/slices/alertSlice";
import Loading from "../../reusable/loading/Loading";

const Freebie = () => {
  const [addMeals, { isLoading }] = useAddMealsMutation();

  const dispatch = useDispatch();

  const onSubmit = async () => {
    await addMeals({ meals: 1, clientId: "689ba0b4e48faccd4d59a9f3" });
    dispatch(setAlert("Freebie meal added"));
  };

  if (isLoading) {
    return <Loading />;
  }

  return <button onClick={onSubmit}>Log a freebie meal</button>;
};

export default Freebie;
