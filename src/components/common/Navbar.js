// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import '../../styles/Navbar.css';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link
          to="/"
          className="brand nav-logo"
          onClick={handleClick}
        >
          Bible.nav
        </Link>
        <div className={click ? 'nav-menu active' : 'nav-menu'}>
          <NavLink
            to="/signup"
            activeClassName="active"
            className="nav-links"
            onClick={handleClick}
          >
            Signup
          </NavLink>
          {' '}
          ||
          <NavLink
            to="/login"
            activeClassName="active"
            className="nav-links"
            onClick={handleClick}
          >
            Login
          </NavLink>
        </div>
        <div className="nav-icon">
          {/* <FontAwesomeIcon icon={['fas', 'times']} /> */}
          <button type="button" onClick={handleClick}><i className="fas fa-times" aria-label="times" /></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
