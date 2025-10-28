import { Link } from "react-router-dom";

import { useUpdateClientsMutation } from "../../state/apis/mealProgramApi/doorfrontApi";

const DoorfrontHome = () => {
  const [updateClients, { isSuccess }] = useUpdateClientsMutation();
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
      <div onClick={() => updateClients().unwrap()}>Update clients</div>
      {isSuccess && "Update Successful!"}
    </div>
  );
};

export default DoorfrontHome;
