import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Docusign = ({ user }) => {
  return <Outlet />;
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps, null)(Docusign);
