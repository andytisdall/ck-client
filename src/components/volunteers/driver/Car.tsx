import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetDriverQuery } from "../../../state/apis/volunteerApi/driver";
import { setAlert } from "../../../state/apis/slices/alertSlice";
import Loading from "../../reusable/loading/Loading";
import {
  useSubmitCarInfoMutation,
  CarSize,
} from "../../../state/apis/volunteerApi/driver";
import CarSizeOption from "./CarSize";

const Car = () => {
  const [submitCarInfo, { isLoading }] = useSubmitCarInfoMutation();
  const { data: driver } = useGetDriverQuery();

  const [size, setSize] = useState<CarSize | undefined>(driver?.car.size);
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

  const renderSizes = () => {
    const sizes: CarSize[] = ["Bike", "Small", "Medium", "Large"];
    return (
      <div className="driver-car-sizes">
        {sizes.map((opt) => {
          return (
            <CarSizeOption
              size={opt}
              setSize={setSize}
              key={opt}
              selected={opt === size}
            />
          );
        })}
      </div>
    );
  };

  const renderCarInfo = () => {
    if (size && size !== "Bike") {
      return (
        <div>
          <h3>
            <u>Car Info</u>
          </h3>
          <div className="driver-onboarding-car-field">
            <label htmlFor="make">Make:</label>
            <input
              id="make"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              required
            />
          </div>
          <div className="driver-onboarding-car-field">
            <label htmlFor="model">Model:</label>
            <input
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>
          <div className="driver-onboarding-car-field">
            <label htmlFor="year">Year:</label>
            <input
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <div className="driver-onboarding-car-field">
            <label htmlFor="color">Color:</label>
            <input
              value={color}
              id="color"
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Enter your vehicle's information</h2>

      <div className="driver-car-text">
        <p>
          Our cambros are insulated storage for transporting meals in bulk. They
          are 30" tall, 20" wide and 25" deep, and fit about 75 meals.
        </p>
      </div>
      <div className="driver-car-images">
        <div className="driver-car-cambro-container">
          <div className="driver-car-cambro-label">Small</div>
          <img src="/images/volunteers/drivers/sm-cambro.jpg" alt="cambro" />
        </div>
        <div className="driver-car-cambro-container">
          <div className="driver-car-cambro-label">Large</div>
          <img src="/images/volunteers/drivers/lg-cambro.jpg" alt="cambro" />
        </div>
        <div className="driver-car-cambro-container">
          <div className="driver-car-cambro-label">Medium</div>
          <img src="/images/volunteers/drivers/md-cambro-2.jpg" alt="cambro" />
        </div>
      </div>
      <div className="driver-car-text">
        <p>Estimate your vehicle's size by how many cambros it can fit:</p>
      </div>
      {renderSizes()}
      <form onSubmit={onSubmit} className="driver-onboarding-car">
        {renderCarInfo()}
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
