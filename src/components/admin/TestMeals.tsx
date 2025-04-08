import { useState } from "react";

import {
  useGetFridgesQuery,
  useCreateDeliveryMutation,
} from "../../state/apis/textApi/sendTextApi";

const TestMeals = () => {
  const [fridge, setFridge] = useState<string>();
  const { data: fridges } = useGetFridgesQuery();
  const [createDelivery] = useCreateDeliveryMutation();

  return (
    <div>
      <select onChange={(e) => setFridge(e.target.value)}>
        {fridges?.map((fridge) => (
          <option key={fridge.id} value={fridge.id}>
            {fridge.name}
          </option>
        ))}
      </select>
      <button onClick={() => fridge && createDelivery({ fridge }).unwrap()}>
        Test
      </button>
    </div>
  );
};

export default TestMeals;
