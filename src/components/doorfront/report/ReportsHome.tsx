import { Link } from "react-router-dom";

const ReportsHome = () => {
  return (
    <div>
      <Link className="text-button-link admin-home-btn" to="copy-client-ids">
        Bulk Copy Client IDs
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

export default ReportsHome;
