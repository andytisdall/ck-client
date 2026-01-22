import { Link } from "react-router-dom";
import { useMemo } from "react";

import { Job } from "../../../state/apis/volunteerApi/types";

const Fridge = ({ fridge }: { fridge: Job }) => {
  const locationUrl = useMemo(() => {
    const isIos = /iPhone|iPad/i.test(navigator.userAgent);
    const baseUrl = isIos
      ? "http://maps.apple.com/?q="
      : "https://www.google.com/maps/place/";
    const location = fridge.location || fridge.name;
    return baseUrl + location.replace(/ /g, "+") + "+" + fridge.locationCity;
  }, [fridge]);

  return (
    <div className="town-fridge">
      <div className="town-fridge-name">{fridge.name}</div>
      <div>{fridge.location}</div>
      <p>{fridge.notes}</p>
      <Link to={locationUrl} target="blank" className="town-fridge-map-link">
        <img
          src="/images/volunteers/mapIcon.png"
          alt="Map"
          className="town-fridge-map-icon"
        />
        Open in Map
      </Link>
    </div>
  );
};

export default Fridge;
