import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

import { getUser, signOut } from '../actions';
import SignUp from './SignUp';
import "./Header.css"

const Header = ({ getUser, user, signOut }) => {
    const [userLoading, setUserLoading] = useState(false);

    useEffect(() => {
      setUserLoading(true);
      getUser();
    }, [getUser]);
  
    useEffect(() => {
      if (user) {
        setUserLoading(false);
        }
    }, [user]);


  const showUser = () => {
    return <>
        <div>Logged in as {user.username}</div>
        <button onClick={signOut}>Sign Out</button>
    </>;
  };


    const renderBasedOnUserStatus = () => {
        return user ? showUser() : <SignUp />;
      };
    
      return (
        <>
          <div className="header">
            <div className="header-left">
              <Link to=".." relative="path">
                <button>Back</button>
              </Link>
              <Link to="/">
                <img
                  src="/images/ck-logo.png"
                  alt="ck logo"
                  className="header-logo"
                />
              </Link>
            </div>
            <div className="header-right">
            {userLoading && <Spinner size={30} />}
            {!userLoading && renderBasedOnUserStatus()}
            </div>
          </div>
          <main>
            <Outlet />
          </main>
        </>
      );
    };


const mapStateToProps = (state) => {
    return {
      user: state.user.user,
    };
  };

export default connect(mapStateToProps, { getUser, signOut })(Header)