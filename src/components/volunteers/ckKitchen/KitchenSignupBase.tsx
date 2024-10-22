import { NavLink, Outlet, useParams } from 'react-router-dom';

import '../Volunteers.css';
import { navLink } from '../../../utils/style';
import useVolunteerWaiver from '../../../hooks/useVolunteerWaiver';

const KitchenSignupBase = () => {
  const { campaignId } = useParams();
  const waiverMessage = useVolunteerWaiver(campaignId);
  if (waiverMessage) {
    return waiverMessage;
  }

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
        <img
          src="/images/volunteers/cookies-1.jpg"
          alt="Sandwiches going out"
          className="volunteers-kitchen-signup-photo volunteers-photo-frame"
        />
        <img
          src="/images/volunteers/wraps.jpeg"
          alt=""
          className="volunteers-kitchen-signup-photo volunteers-photo-frame"
        />
        <img
          src="/images/volunteers/sandwiches.jpeg"
          alt=""
          className="volunteers-kitchen-signup-photo volunteers-photo-frame"
        />
      </div>
      <Outlet />
    </div>
  );
};

export default KitchenSignupBase;
