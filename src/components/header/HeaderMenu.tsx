import { Dispatch } from 'react';

import { useGetUserQuery } from '../../state/apis/authApi';
import Loading from './../reusable/loading/Loading';
import SignedIn from './../auth/SignedIn/SignedIn';
import SignedOut from './../auth/SignedOut/SignedOut';

const HeaderMenu = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data, isFetching } = useGetUserQuery();

  // useEffect(() => {
  //   setMenuOpen(false);
  // }, [data, setMenuOpen]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <>
      <img
        src={'/images/icons/' + (menuOpen ? 'close.svg' : 'burger-menu.svg')}
        alt="User Menu"
        className="burger-menu-img"
        onClick={() => setMenuOpen(!menuOpen)}
      />
      <div className={`header-right ${menuOpen ? '' : 'hidden'}`}>
        <div className="header-auth">{data ? <SignedIn /> : <SignedOut />}</div>
      </div>
    </>
  );
};

export default HeaderMenu;
