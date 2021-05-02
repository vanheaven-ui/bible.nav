import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { removeUser } from '../../redux/actions';

const LoggedInNavbar = ({ status }) => {
  // Use useDispatch hook to send actions to redux store
  const dispatch = useDispatch();

  // get current user from redux store
  const currentUser = useSelector(state => state.user);

  // function to handle login status
  const handleLogout = () => {
    dispatch(removeUser);
    status(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">Bible.nav</Link>
        <div className="username" style={{ margin: '0 auto' }}>
          <small>Welcome</small>
          {' '}
          {currentUser.user.username}
        </div>
        <div className="links">
          <NavLink to="/favorites" activeClassName="active" className="nav-links">Favourites</NavLink>
          <Link to="/" className="nav-links" onClick={handleLogout}>Logout</Link>
        </div>
      </div>
    </nav>
  );
};

LoggedInNavbar.propTypes = {
  status: PropTypes.func.isRequired,
};

export default LoggedInNavbar;
