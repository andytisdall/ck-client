import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import * as actions from '../../actions';

const KitchenBase = ({ getKitchenShifts }) => {
  useEffect(() => {
    getKitchenShifts();
  }, [getKitchenShifts]);
  return <Outlet />;
};

export default connect(null, actions)(KitchenBase);
