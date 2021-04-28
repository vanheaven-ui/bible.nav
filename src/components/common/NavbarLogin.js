import { Link } from 'react-router-dom';

const LoggedInNavbar = () => (
  <>
    <div className="brand">
      <Link to="/">Bible.nav</Link>
    </div>
    <div className="links">
      <Link to="/favorites">Favourites</Link>
      <button type="button">Logout</button>
    </div>
  </>
);

export default LoggedInNavbar;
