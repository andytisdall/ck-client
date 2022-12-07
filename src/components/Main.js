import { Switch, Route } from 'react-router-dom';

import './Main.css';
import AddPhone from './AddPhone';
import SendSMS from './SendSMS';

const Main = ({ user, setError }) => {
  const renderWelcome = () => {
    return <div>Please Sign In</div>;
  };

  const Home = () => {
    return (
      <div className="home">
        <a href="/add-phone">
          <button>Add a Phone Number to the Text List</button>
        </a>
        <a href="/send-sms">
          <button>Send a Text to the List</button>
        </a>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <Switch>
        <Route
          path="/add-phone"
          exact
          render={() => {
            return <AddPhone setError={setError} />;
          }}
        />
        <Route
          path="/send-sms"
          exact
          render={() => {
            return <SendSMS setError={setError} />;
          }}
        />
        <Route path="/" exact component={Home} />
      </Switch>
    );
  };

  return <div className="main">{user ? renderMain() : renderWelcome()}</div>;
};

export default Main;
