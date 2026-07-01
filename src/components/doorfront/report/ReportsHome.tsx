import { Link } from "react-router-dom";

const ReportsHome = () => {
  return (
    <div>
      <div className="doorfront-header">
        <h2>Doorfront Reports</h2>
        <div className="meal-reports-dates">
          <Link to={".."}>
            <button className="cancel">Back</button>
          </Link>
        </div>
      </div>

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
