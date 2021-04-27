import { Link } from 'react-router-dom';

const Navbar = () => (
  <>
    <div className="brand">
      <Link to="/">Bible.nav</Link>
    </div>
    <div className="links">
      <Link to="/signup">Signup</Link>
      {' '}
      ||
      <Link to="/login">Login</Link>
    </div>
  </>
);

export default Navbar;
