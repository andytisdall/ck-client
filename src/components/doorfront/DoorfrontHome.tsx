import { Link } from "react-router-dom";

const DoorfrontHome = () => {
  return (
    <div>
      <Link className="text-button-link admin-home-btn" to="scan">
        Scan Barcode
      </Link>

      <Link className="text-button-link admin-home-btn" to="reports">
        Reports
      </Link>

      <Link className="text-button-link admin-home-btn" to="create">
        Create Meals
      </Link>
    </div>
  );
};

export default DoorfrontHome;
