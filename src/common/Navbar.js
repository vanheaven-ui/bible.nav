import { Link } from 'react-router-dom';

const Navbar = () => (
  <>
    <div className="brand">
      <a href="/">Bible.nav</a>
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
