import { NavLink, Outlet, useParams } from "react-router-dom";

import "../Volunteers.css";
import { navLink } from "../../../utils/style";
import { useGetCampaignsQuery } from "../../../state/apis/volunteerApi/campaigns";

const images = ["cookies-1.jpg", "wraps.jpeg", "sandwiches.jpeg"];

const KitchenSignupBase = () => {
  const { campaignId } = useParams();
  const { data: campaigns } = useGetCampaignsQuery();
  const campaign = campaigns?.find(
    (c) =>
      c.id === campaignId || c.id.substring(0, c.id.length - 3) === campaignId
  );

  return (
    <div className="volunteers-body">
      <div className="volunteers-shift-signup-links">
        <NavLink
          className={navLink}
          to={`/volunteers/ck-kitchen/signup/${campaignId}`}
        >
          List
        </NavLink>
        <NavLink className={navLink} to="cal">
          Calendar
        </NavLink>
      </div>
      <div className="volunteers-kitchen-signup-photos">
        {campaign &&
          images.map((img) => (
            <img
              key={img}
              src={`/images/volunteers/${img}`}
              alt="CK Volunteers"
              className="volunteers-kitchen-signup-photo volunteers-photo-frame"
            />
          ))}
      </div>
      <Outlet />
    </div>
  );
};

export default KitchenSignupBase;
