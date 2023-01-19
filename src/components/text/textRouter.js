import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';

import AddPhone from './AddPhone';
import TextHome from './TextHome';
import SendText from './SendText';
import TextSuccess from './TextSuccess';
import Feedback from './Feedback';
import './TextHome.css';
import { getUser } from '../../actions';

const Text = ({ user }) => {
  const renderSignIn = () => {
    return <h3>You must be an admin to access this page.</h3>;
  };

  return (
    <div className="main text-home">
      <h1 className="page-header">Text Service</h1>
      {user && user.admin ? <Outlet /> : renderSignIn()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

const ConnectedText = connect(mapStateToProps, { getUser })(Text);

const textRouter = {
  path: 'text',
  element: <ConnectedText />,
  children: [
    { index: true, element: <TextHome /> },
    {
      path: 'add-phone',
      element: <AddPhone />,
    },
    { path: 'send-text', element: <SendText /> },
    { path: 'text-success', element: <TextSuccess /> },
    { path: 'feedback', element: <Feedback /> },
  ],
};

export default textRouter;
