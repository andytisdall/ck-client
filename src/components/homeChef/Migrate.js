import { connect } from 'react-redux';
import * as actions from '../../actions';

const Migrate = ({ migrate }) => {
  return <button onClick={migrate}>Migrate Users</button>;
};

export default connect(null, actions)(Migrate);
