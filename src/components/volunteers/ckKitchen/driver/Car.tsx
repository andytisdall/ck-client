import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetDriverQuery } from "../../../../state/apis/volunteerApi/driver";
import { setAlert } from "../../../../state/apis/slices/alertSlice";
import Loading from "../../../reusable/loading/Loading";
import {
  useSubmitCarInfoMutation,
  CarSize,
  useGetCarsQuery,
} from "../../../../state/apis/volunteerApi/driver";

const Car = () => {
  const [submitCarInfo, { isLoading }] = useSubmitCarInfoMutation();
  const { data: driver } = useGetDriverQuery();
  // const { data: cars } = useGetCarsQuery();
  const [size, setSize] = useState<CarSize | undefined>(driver?.car);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (size) {
      await submitCarInfo({ size }).unwrap();
      dispatch(setAlert("Car info updated!"));
      navigate("..");
    }
  };

  return (
    <div>
      <h3>Select your car size</h3>
      <ul>
        <li>Small: 10-34 cubic feet</li>
        <li>Medium: 35-59 cubic feet</li>
        <li>Large: 60+ cubic feet</li>
      </ul>
      <form defaultValue={driver?.car} onSubmit={onSubmit}>
        <select
          defaultValue={undefined}
          onChange={(e) => {
            // @ts-ignore
            setSize(e.currentTarget.value);
          }}
        >
          <option>Select a size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="Bike">Bike</option>
        </select>
        {isLoading ? <Loading /> : <input type="submit" disabled={!size} />}
      </form>
      <button onClick={() => navigate("..")}>Back</button>

      {/* {Array.from(new Set(cars?.map((car) => car.make)))
        ?.sort()
        .map((make) => <div key={make}>{make}</div>)} */}
    </div>
  );
};

export default Car;
