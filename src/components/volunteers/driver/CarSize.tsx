import { CarSize } from "../../../state/apis/volunteerApi/driver";

const sizeMeasurements: Record<CarSize, string> = {
  Bike: "",
  Small: "2-3 cambros",
  Medium: "4-5 cambros",
  Large: "6+ cambros",
};

const CarSizeOption = ({
  size,
  setSize,
  selected,
}: {
  size: CarSize;
  setSize: (s: CarSize) => void;
  selected: boolean;
}) => {
  return (
    <div
      className={`driver-car-size ${selected ? "driver-car-size-selected" : ""}`}
      onClick={() => setSize(size)}
    >
      <img
        src={`/images/volunteers/drivers/vehicle-${size}.jpg`}
        alt={size}
        className="driver-car-photo"
      />
      <div className="driver-car-size-label">{size}</div>
      <i>{sizeMeasurements[size]}</i>
    </div>
  );
};

export default CarSizeOption;
