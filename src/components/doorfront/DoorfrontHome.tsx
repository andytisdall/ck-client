import { Link } from "react-router-dom";

const DoorfrontHome = () => {
  return (
    <div>
      <Link className="text-button-link admin-home-btn" to="scan">
        Scan Barcode
      </Link>
      <Link className="text-button-link admin-home-btn" to="meal-report">
        Meal Report
      </Link>
      <Link className="text-button-link admin-home-btn" to="client-report">
        Client Report
      </Link>
      <Link className="text-button-link admin-home-btn" to="monthly-report">
        Monthly Report
      </Link>
    </div>
  );
};

export default DoorfrontHome;
