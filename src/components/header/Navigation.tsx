import { Link } from "react-router-dom";

import "./Navigation.css";
import { useGetUserQuery } from "../../state/apis/authApi";

const Navigation = () => {
  const userQuery = useGetUserQuery();
  const user = userQuery.data;

  const NavButton = ({ to, text }: { to: string; text: string }) => {
    return (
      <Link className="nav-btn" to={to}>
        {text}
      </Link>
    );
  };

  const renderVolunteers = () => {
    return <NavButton to="volunteers" text="CK Volunteers" />;
  };

  const renderTextService = () => {
    if (user?.admin || user?.busDriver) {
      return <NavButton to="text" text="Text Service" />;
    }
  };

  const renderAdmin = () => {
    if (user?.admin) {
      return <NavButton to="admin" text="Admin" />;
    }
  };

  const renderNoUser = () => {
    return <div className="nav-btns">{renderVolunteers()}</div>;
  };

  const renderWithUser = () => {
    return (
      <div className="nav-btns">
        {renderTextService()}
        {renderVolunteers()}
        <NavButton to="user" text="User Settings" />
        {renderAdmin()}
      </div>
    );
  };

  return <nav>{user ? renderWithUser() : renderNoUser()}</nav>;
};

export default Navigation;
