import "./FridgeMap.css";

const GOOGLE_MAP_URL =
  "https://www.google.com/maps/d/embed?mid=1Y5Jf-_hOU2OHTTkcua8SZOvUPvj3jv90&ehbc=2E312F";

const FridgeMap = () => {
  return (
    <iframe
      loading="lazy"
      src={GOOGLE_MAP_URL}
      className="fridge-map"
      title="Town Fridge Google Map"
    />
  );
};

export default FridgeMap;
