import { Outlet, Link } from 'react-router-dom';

const KitchenBase = () => {
  return (
    <div>
      <Link to="/volunteers/ck-kitchen">
        <h1 className="volunteers-main-header volunteers-kitchen-header">
          CK Kitchen
        </h1>
      </Link>
      <Outlet />
    </div>
  );
};

export default KitchenBase;
