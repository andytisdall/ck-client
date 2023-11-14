import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';

import './Header.css';
import HeaderMenu from './HeaderMenu';
import Navigation from './Navigation';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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

        <HeaderMenu setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      </div>
      {menuOpen && <Navigation />}

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Header;
