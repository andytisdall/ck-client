import { connect } from 'react-redux';

import CreateUser from './CreateUser';
import CreateRestaurant from './CreateRestaurant';

const Create = ({ alert }) => {
  const renderSuccess = () => {
    return (
      <div className="alert-box">
        <div className="sent-success">{alert}</div>
      </div>
    );
  };

  return (
    <div className="create-main">
      <CreateUser />
      <CreateRestaurant />
      {alert && renderSuccess()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { alert: state.alert.message };
};

export default connect(mapStateToProps, null)(Create);
