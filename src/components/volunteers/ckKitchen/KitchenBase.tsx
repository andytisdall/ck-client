import { Outlet } from 'react-router-dom';

const KitchenBase = () => {
  return (
    <div>
      <h1 className="volunteers-main-header volunteers-kitchen-header">
        CK Kitchen
      </h1>
      <Outlet />
    </div>
  );
};

export default KitchenBase;
