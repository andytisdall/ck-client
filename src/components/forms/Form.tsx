import { Outlet } from 'react-router-dom';

const Form = () => {
  const headerImage = () => {
    return (
      <img
        src="../images/logos/ck-header.png"
        alt="Community Kitchens"
        className="form-item form-logo"
      />
    );
  };

  return (
    <div className="form-background">
      <div className="form main">
        {headerImage()}
        <Outlet />
      </div>
    </div>
  );
};

export default Form;
