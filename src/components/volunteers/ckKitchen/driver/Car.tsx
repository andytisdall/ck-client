import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetDriverQuery } from "../../../../state/apis/volunteerApi/driver";
import { setAlert } from "../../../../state/apis/slices/alertSlice";
import Loading from "../../../reusable/loading/Loading";
import {
  useSubmitCarInfoMutation,
  CarSize,
} from "../../../../state/apis/volunteerApi/driver";

const Car = () => {
  const [submitCarInfo, { isLoading }] = useSubmitCarInfoMutation();
  const { data: driver } = useGetDriverQuery();

  const [size, setSize] = useState<CarSize>();
  const [make, setMake] = useState(driver?.car?.make || "");
  const [model, setModel] = useState(driver?.car?.model || "");
  const [year, setYear] = useState(driver?.car?.year || "");
  const [color, setColor] = useState(driver?.car?.color || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (size) {
      await submitCarInfo({ size, make, model, year, color }).unwrap();
      dispatch(setAlert("Car info updated!"));
      navigate("..");
    }
  };

  return (
    // write explanation about cambro sizes
    // take photos of cars with cambros in them
    <div>
      <h3>Select your car size</h3>
      <ul>
        <li>Small: 2-3 Cambros</li>
        <li>Medium: 4-5 Cambros</li>
        <li>Large: 6 or more Cambros</li>
      </ul>
      <form onSubmit={onSubmit}>
        <label>Car Size: </label>
        <select
          defaultValue={driver?.car.size}
          onChange={(e) => setSize(e.currentTarget.value as CarSize)}
        >
          <option value={undefined}></option>
          {["Bike", "Small", "Medium", "Large"].map((opt) => (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ))}
        </select>
        {size && size !== "Bike" && (
          <>
            <div>
              <label htmlFor="make">Make:</label>
              <input
                id="make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="model">Model:</label>
              <input
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="year">Year:</label>
              <input
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="color">Color:</label>
              <input
                value={color}
                id="color"
                onChange={(e) => setColor(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <input type="submit" className={!size ? "btn-inactive" : ""} />
          )}
          <button className="cancel" onClick={() => navigate("..")}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Car;
