import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';

import './Header.css';
import AuthBase from './auth/AuthBase';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const image = menuOpen ? 'close.svg' : 'burger-menu.svg';

  return (
    <>
      <div className="header">
        <Link to="/">
          <img
            src="/images/logos/ck-logo.png"
            alt="ck logo"
            className="header-logo"
          />
        </Link>

        <img
          src={'/images/icons/' + image}
          alt="menu"
          className="burger-menu-img"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <div className="header-right">{menuOpen && <AuthBase />}</div>
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Header;
